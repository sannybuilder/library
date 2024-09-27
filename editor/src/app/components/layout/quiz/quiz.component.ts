import { Component, Input } from '@angular/core';
import { BehaviorSubject, debounceTime, map, merge } from 'rxjs';
import { Command, Extension, Game } from 'src/app/models';
import { isSupported } from 'src/app/utils';

enum Status {
  UNANSWERED = 0,
  CORRECT = 1,
  INCORRECT = 2,
}

const NUM_CHOICES = 3;
const ANSWER_RETAIN_TIME = 8000;
const MAX_ITERATIONS = 50;

@Component({
  selector: 'scl-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  Status = Status;
  _extensions: Extension[];

  streak = 0;
  showStreak = false;

  status$ = new BehaviorSubject<Status>(Status.UNANSWERED);
  statusMessage$ = merge(
    this.status$,
    this.status$.pipe(
      debounceTime(ANSWER_RETAIN_TIME),
      map(() => '')
    )
  );

  @Input() game: Game;

  @Input() set extensions(value: Extension[]) {
    this._extensions = value;
    if (value && value[0].commands.length > 10) {
      this.nextQuestion();
    }
  }

  get extensions() {
    return this._extensions;
  }

  question: string;
  answers: { option: string; correct: boolean }[];

  correctCommand: string;
  correctExtension: string;
  correctText: string;
  incorrectText: string;

  getRandomCommand(): Command {
    const extensionWeights = this.extensions.map((e) =>
      Math.min(100, e.commands.length)
    );
    const randomExtension =
      this.extensions[this.weightedRandom(extensionWeights)];

    const commands = randomExtension.commands.filter((c) =>
      isSupported(c.attrs)
    );
    return commands[Math.floor(Math.random() * commands.length)];
  }

  weightedRandom(weights: number[]): number {
    const totalWeight = weights.reduce((acc, w) => acc + w, 0);
    const random = Math.random() * totalWeight;
    let weightSum = 0;
    for (let i = 0; i < weights.length; i++) {
      weightSum += weights[i];
      if (random < weightSum) {
        return i;
      }
    }
    return 0;
  }

  questionOnDescription(iteration: number): Command[] {
    if (iteration > MAX_ITERATIONS) {
      return [];
    }
    const command = this.getRandomCommand();
    if (!command.short_desc) {
      return this.questionOnDescription(iteration + 1);
    }
    this.question = this.getFirstSentence(this.lowerFirst(command.short_desc));

    return this.addWrongChoices([command], 'short_desc');
  }

  getFirstSentence(text: string) {
    return text.split('. ').shift() as string;
  }

  questionOnClass(iteration: number): Command[] {
    if (iteration > MAX_ITERATIONS) {
      return [];
    }
    const command = this.getRandomCommand();
    if (!command.class) {
      return this.questionOnClass(iteration + 1);
    }

    this.question = `is part of the class ${command.class}`;

    return this.addWrongChoices([command], 'class');
  }

  questionOnNumParams(iteration: number): Command[] {
    if (iteration > MAX_ITERATIONS) {
      return [];
    }
    const command = this.getRandomCommand();
    if (!command.num_params) {
      return this.questionOnNumParams(iteration + 1);
    }

    this.question = `takes ${command.num_params} parameters`;

    return this.addWrongChoices([command], 'num_params');
  }

  addWrongChoices(choices: Command[], field: keyof Command): Command[] {
    let iteration = 0;
    while (choices.length < NUM_CHOICES) {
      const choice = this.getRandomCommand();

      if (iteration++ > MAX_ITERATIONS) {
        return [];
      }

      if (choices.find((c) => c.name === choice.name)) {
        continue;
      }
      if (choices.find((c) => c[field] === choice[field])) {
        continue;
      }
      choices.push(choice);
    }

    return choices;
  }

  nextQuestion() {
    const questionPicker: Array<[(iteration: number) => Command[], number]> = [
      [this.questionOnDescription, 60],
      [this.questionOnNumParams, 80],
      [this.questionOnClass, 100],
    ];
    const pickIndex = Math.random() * 100;
    const choices = questionPicker
      .find(([_, prob]) => pickIndex <= prob)![0]
      .call(this, 0);

    this.answers = choices
      .map((c, i) => ({
        option: c.name,
        correct: i === 0,
      }))
      .sort(() => Math.random() - 0.5);

    this.correctText = this.pickCorrect();
    this.incorrectText = this.pickIncorrect();
  }

  lowerFirst(word: string) {
    if (!word) return word;
    return word[0].toLowerCase() + word.substr(1);
  }

  onSubmit(answer: string) {
    const correctAnswer = this.answers.find((a) => a.correct)!;
    this.correctCommand = correctAnswer.option;
    this.correctExtension = this.extensions.find((e) =>
      e.commands.find((c) => c.name === correctAnswer.option)
    )?.name!;
    if (correctAnswer.option === answer) {
      this.status$.next(Status.CORRECT);

      this.streak++;
      this.showStreak = true;
    } else {
      this.status$.next(Status.INCORRECT);
      this.streak = 0;
    }
    this.nextQuestion();
  }

  pickCorrect() {
    const c = [
      'Correct!',
      'Right!',
      'Yes!',
      'Good job!',
      'You got it!',
      'Nice!',
      'Great!',
      'Awesome!',
      'Well done!',
    ];
    const index = Math.floor(Math.random() * c.length);
    return c[index];
  }

  pickIncorrect() {
    const c = [
      'Incorrect!',
      'Nope!',
      'Try again!',
      'Not quite!',
      'Almost!',
      'Oops!',
      'Uh oh!',
    ];
    const index = Math.floor(Math.random() * c.length);
    return c[index];
  }
}

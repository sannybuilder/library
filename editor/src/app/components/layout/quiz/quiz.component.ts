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
    if (value) {
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
    const randomExtension =
      this.extensions[Math.floor(Math.random() * this.extensions.length)];

    const commands = randomExtension.commands.filter((c) =>
      isSupported(c.attrs)
    );
    return commands[Math.floor(Math.random() * commands.length)];
  }

  questionOnDescription(): Command[] {
    const command = this.getRandomCommand();
    if (!command.short_desc) {
      return this.questionOnDescription();
    }
    this.question = this.lowerFirst(command.short_desc);

    return this.addWrongChoices([command], 'short_desc');
  }

  questionOnClass(): Command[] {
    const command = this.getRandomCommand();
    if (!command.class) {
      return this.questionOnClass();
    }

    this.question = `is part of the class ${command.class}`;

    return this.addWrongChoices([command], 'class');
  }

  questionOnNumParams(): Command[] {
    const command = this.getRandomCommand();
    if (!command.num_params) {
      return this.questionOnNumParams();
    }

    this.question = `takes ${command.num_params} parameters`;

    return this.addWrongChoices([command], 'num_params');
  }

  addWrongChoices(choices: Command[], field: keyof Command): Command[] {
    while (choices.length < NUM_CHOICES) {
      const choice = this.getRandomCommand();

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
    const questionPicker: Array<[() => Command[], number]> = [
      [this.questionOnDescription, 60],
      [this.questionOnNumParams, 80],
      [this.questionOnClass, 100],
    ];
    const pickIndex = Math.random() * 100;
    const choices = questionPicker
      .find(([_, prob]) => pickIndex <= prob)![0]
      .call(this);

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

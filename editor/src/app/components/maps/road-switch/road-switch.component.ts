import { Component, EventEmitter, Output } from '@angular/core';
import { CNodesSwitchedOnOrOff, execute, compile, POOL_SIZE } from './compiler';
import { install, uninstall } from '@github/hotkey';
import source from './source';

enum Algorithm {
  Original = 'Original (Bugged)',
  Patched = 'Patched',
}

@Component({
  selector: 'scl-road-switch',
  templateUrl: './road-switch.component.html',
  styleUrl: './road-switch.component.scss',
  standalone: false,
})
export class RoadSwitchComponent {
  POOL_SIZE = POOL_SIZE;
  source = source
    .split('\n')
    .map((x) => x.trim())
    .join('\n');
  pool: CNodesSwitchedOnOrOff[] = [];
  algorithms = [Algorithm.Original, Algorithm.Patched];
  selectedAlgorithm = Algorithm.Original;

  isRunning = false;
  activeLine = 0;
  lines: Array<{
    text: string;
    index: number;
  }> = [];

  @Output() update = new EventEmitter<CNodesSwitchedOnOrOff[]>();

  run() {
    this.isRunning = true;
    this.activeLine = -1;
    this.lines = this.source.split('\n').map((line, index) => {
      return {
        text: line.trim(),
        index,
      };
    });
    this.next();

    setTimeout(() => {
      const sb = document.querySelectorAll('.hotkey');
      sb.forEach((element) => {
        install(element as HTMLElement);
      });
    });
  }

  next() {
    if (!this.isRunning || this.activeLine >= this.lines.length - 1) {
      return;
    }
    this.scrollToActiveLine();
    this.execute(++this.activeLine);
  }

  prev() {
    if (!this.isRunning || this.activeLine <= 0) {
      return;
    }
    this.scrollToActiveLine();
    this.execute(--this.activeLine);
  }

  stop() {
    this.isRunning = false;

    const sb = document.querySelectorAll('.hotkey');
    sb.forEach((element) => {
      uninstall(element as HTMLElement);
    });
  }

  scrollToActiveLine() {
    setTimeout(() => {
      const line = document.querySelector('.line.active');
      if (line) {
        line.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  execute(line: number) {
    const commands = compile(this.source);
    this.pool = [];
    execute(
      commands.slice(0, line + 1),
      {
        patched: this.selectedAlgorithm === Algorithm.Patched,
      },
      this.pool
    );
    this.update.emit(this.pool);
  }

  toStart() {
    if (!this.isRunning || this.activeLine <= 0) {
      return;
    }
    this.activeLine = 0;
    this.scrollToActiveLine();
    this.execute(this.activeLine);
  }

  toEnd() {
    if (!this.isRunning || this.activeLine >= this.lines.length - 1) {
      return;
    }
    this.activeLine = this.lines.length - 1;
    this.scrollToActiveLine();
    this.execute(this.activeLine);
  }
}

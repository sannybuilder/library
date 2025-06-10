import { Component, EventEmitter, Output } from '@angular/core';
import { CNodesSwitchedOnOrOff, execute, compile, POOL_SIZE } from './compiler';
import { install, uninstall } from '@github/hotkey';

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
  source = `
  // -------------------- main.sc --------------------

  SWITCH_ROADS_OFF 2500.0 -1677.0 20.0 2430.0 -1653.0 0.0	 //REMOVE (SPEAK TO JOHN)

  // -------------------- intro.sc --------------------
  
  //Gant Bridge  ( Golden Gate )
	SWITCH_ROADS_OFF -2696.4641 1239.8665 40.7599 -2665.3591 2190.9604 70.8125    // Main Section.
	SWITCH_ROADS_OFF -2740.6941 2233.6179 40.8431 -2720.9102 2338.2244 80.4822	  // Country Section.
	SWITCH_ROADS_OFF -2695.5842 1237.9807 40.7328 -2664.4170 1454.7675 60.8126
	SWITCH_ROADS_OFF -2670.1731 1203.3314 50.4297 -2662.6604 1237.7072 60.5781 //Last minute fix for Golden gate traffic madness, may cause more chaos. Switches four nodes off.

	// The Panopticon ( Red metal bridge in D6  )
	SWITCH_ROADS_OFF -995.0013 -416.2032 30.4207 -940.5399 -251.8564 40.6762

	//Red County ( E5 Red curved bridge )
	SWITCH_ROADS_OFF -205.8387 250.7443 7.2472 -131.0039 481.8496 15.9152

	//Flint County ( E7 small road bridge )
	SWITCH_ROADS_OFF -100.7515 -927.8298 18.0 -68.3752 -891.9871 14.0

	//Hampton Barns            ( F5 Hexagonal Style framing )
	SWITCH_ROADS_OFF 609.7595 327.3437 15.8783 429.8884 616.0168 20.2890
	SWITCH_ROADS_OFF 317.1688 707.7672 7.0 437.5726 709.0657 20.5578
	SWITCH_ROADS_OFF 391.1194 640.0150 7.0 402.2627 664.7980 18.5098

	SWITCH_ROADS_OFF 289.2904 636.3991 7.8675 409.4943 702.3849 20.0345
	SWITCH_ROADS_OFF 300.3153 718.7909 7.7846 316.7906 781.0926 14.0795 
	SWITCH_ROADS_OFF 254.9982 837.0290 10.1731 270.7453 929.2404 30.2553
	SWITCH_ROADS_OFF 210.7811 939.2068 10.9062 249.4799 959.1111 30.2141

	SWITCH_ROADS_OFF 230.4545 946.0961 20.6674 255.9772 969.2755 30.4776
	SWITCH_ROADS_OFF 249.4279 899.7975 10.5871 268.6826 933.5995 30.3975
	SWITCH_ROADS_OFF 312.1081 694.1089 6.0 324.0811 733.0005 10.0
	SWITCH_ROADS_OFF 324.4526 804.9198 9.6186 332.8747 814.3560 14.3925

	//Montgomery Intersection ( I5 potential hotspot! )
	SWITCH_ROADS_OFF 1690.8192 376.5103 28.1103 1730.2230 445.2955 30.8414
	SWITCH_ROADS_OFF 1643.5355 227.3723 27.4457 1673.0623 295.5788 30.0815 
	SWITCH_ROADS_OFF 1673.7654 388.1013 40.2331	1815.8619 804.9291 10.0 // Bridge section.
	SWITCH_ROADS_OFF 1705.1558 308.3448 20.0  1710.9475 316.4094 23.5612 // Slip Road.

	//Wee metal side bridge in E8 near Flint Intersection
	SWITCH_ROADS_OFF -12.7067 -1522.4554 1.0 80.8463 -1517.1113 5.0
	SWITCH_ROADS_OFF -16.3392 -1532.8817 0.0394 69.3401 -1523.7710 5.9220 

	//Complicated tunnel bit from F8 to G8
	SWITCH_ROADS_OFF 618.7253 -1189.6063 18.0 623.5441 -1161.9812 22.0 // Main Section blocker
	SWITCH_ROADS_OFF -33.4208 -1341.8403 9.0 35.3764 -1303.9479 13.0 // Close Southbound traffic
	SWITCH_ROADS_OFF -41.2393 -1385.8701 8.0 -3.5883 -1368.8558 10.5 // Fiddly section to stop northbound traffic but keep ring round open

	//Garver Bridge	( Forth Road ) 
	SWITCH_ROADS_OFF -1690.7048 539.6102 30.3278 -1100.5674 1140.5695 50.7350
	SWITCH_ROADS_OFF -1799.5405 379.7155 16.0 -1780.1991 392.2779 18.0
	SWITCH_ROADS_OFF -1092.4293 1286.5054 30.0 -1077.0385 1319.4948 35.0
	SWITCH_ROADS_OFF -1860.1334 314.7891 38.0 -1638.5630 557.4354 40.0
	SWITCH_ROADS_OFF -1737.3331 455.9431 30.3573 -1710.3633 500.6261 40.4891
	SWITCH_ROADS_OFF -1689.2291 513.0995 30.2597 -1679.1241 524.8383 40.2500
	SWITCH_ROADS_OFF -1742.9060 500.7302 30.4679 -1650.3119 551.8201 40.7455 
  `
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

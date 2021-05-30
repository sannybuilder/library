import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';

@Component({
  selector: 'scl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _lastScroll = 0;
  private _ticking = false;

  constructor(@Inject(DOCUMENT) private _d: Document) {}

  @HostListener('window:scroll', [])
  onScroll() {
    if (!this._ticking) {
      requestAnimationFrame(() => {
        this.updateBodyClasses();
        this._ticking = false;
      });

      this._ticking = true;
    }
  }

  private updateBodyClasses() {
    const classList = this._d.body.classList;
    const scrollUp = 'scroll-up';
    const scrollDown = 'scroll-down';
    const scrolledDown = 'scrolled-down';
    const currentScroll = window.pageYOffset;
    // go to top link
    if (currentScroll > 53) {
      classList.add(scrolledDown);
    } else {
      classList.remove(scrolledDown);
    }
    if (currentScroll <= 0) {
      classList.remove(scrollUp);
      return;
    }
    if (currentScroll > this._lastScroll && !classList.contains(scrollDown)) {
      classList.remove(scrollUp);
      classList.add(scrollDown);
    } else if (
      currentScroll < this._lastScroll &&
      classList.contains(scrollDown)
    ) {
      classList.remove(scrollDown);
      classList.add(scrollUp);
    }
    this._lastScroll = currentScroll;
  }
}

import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';

@Component({
  selector: 'scl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _lastScroll = 0;
  constructor(@Inject(DOCUMENT) private _d: Document) {}

  @HostListener('window:scroll', [])
  onScroll() {
    const classList = this._d.body.classList;
    const scrollUp = 'scroll-up';
    const scrollDown = 'scroll-down';

    const currentScroll = window.pageYOffset;
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

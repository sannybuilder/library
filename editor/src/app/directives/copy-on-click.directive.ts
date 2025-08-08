import { Directive, HostListener, Renderer2 } from '@angular/core';

/**
 * Attribute directive that delegates click handling to child elements.
 * When a click originates from within the host element, it reads the
 * `data-copy-text` attribute from the event target and copies it to the clipboard.
 * Shows a temporary visual indicator when copy is successful.
 */
@Directive({
  selector: '[copyOnClick]',
  standalone: false,
})
export class CopyOnClickDirective {
  constructor(private renderer: Renderer2) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }

    const textToCopy = target.getAttribute('data-copy-text');
    if (textToCopy && textToCopy.length > 0) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.showCopyIndicator(target);
      });
    }
  }

  private showCopyIndicator(element: HTMLElement): void {
    const COPY_SUCCESS_CLASS = 'copy-success';
    const INDICATOR_DURATION = 2000; // 2 seconds
    // Add the success class for visual feedback
    this.renderer.addClass(element, COPY_SUCCESS_CLASS);

    // Remove the class after the specified duration
    setTimeout(() => {
      this.renderer.removeClass(element, COPY_SUCCESS_CLASS);
    }, INDICATOR_DURATION);
  }
}

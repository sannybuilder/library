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
  private readonly COPY_SUCCESS_CLASS = 'copy-success';
  private readonly INDICATOR_DURATION = 2000; // 2 seconds

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
    // Add the success class for visual feedback
    this.renderer.addClass(element, this.COPY_SUCCESS_CLASS);

    // Remove the class after the specified duration
    setTimeout(() => {
      this.renderer.removeClass(element, this.COPY_SUCCESS_CLASS);
    }, this.INDICATOR_DURATION);
  }
}

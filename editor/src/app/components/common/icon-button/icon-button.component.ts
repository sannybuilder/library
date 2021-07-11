import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'scl-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {
  @Input() icon: string;
  @Input() disabled: boolean;
  @Input() label?: string;
  @Output() clicked = new EventEmitter();
}

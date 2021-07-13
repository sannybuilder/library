import { ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'scl-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.scss'],
})
export class CopyButtonComponent {
  private _icon: string;
  @Input() set icon(val: string) {
    this.currentIcon = this._icon = val;
  }
  get icon() {
    return this._icon;
  }
  @Input() label: string;
  @Input() onCopyLabel: string;
  @Input() text: string;

  currentIcon: string;
  isDisabled: boolean;
  canCopy = 'clipboard' in navigator;

  constructor(private _ref: ChangeDetectorRef) {}

  public get hasJustCopied() {
    return this.isDisabled;
  }

  copy() {
    return navigator.clipboard.writeText(this.text).then(() => this.onCopy());
  }

  onCopy() {
    this.isDisabled = true;
    this.currentIcon = 'success';
    this._ref.markForCheck();
    setTimeout(() => {
      this.isDisabled = false;
      this.currentIcon = this.icon;
      this._ref.markForCheck();
    }, 1500);
  }
}

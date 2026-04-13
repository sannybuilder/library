import { Component, Input } from '@angular/core';

@Component({
  selector: 'scl-scm-refs',
  templateUrl: './scm-refs.component.html',
  styleUrls: ['./scm-refs.component.scss'],
  standalone: false,
})
export class ScmRefsComponent {
  @Input() refs: number[] = [];
  @Input() activeFragment?: string | null;
}

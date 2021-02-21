import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandListComponent } from './command-list.component';

describe('CommandListComponent', () => {
  let component: CommandListComponent;
  let fixture: ComponentFixture<CommandListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

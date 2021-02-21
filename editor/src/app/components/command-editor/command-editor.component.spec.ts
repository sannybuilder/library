import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandEditorComponent } from './command-editor.component';

describe('CommandEditorComponent', () => {
  let component: CommandEditorComponent;
  let fixture: ComponentFixture<CommandEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

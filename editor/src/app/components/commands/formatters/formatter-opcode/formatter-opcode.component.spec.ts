import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatterOpcodeComponent } from './formatter-opcode.component';

describe('FormatterOpcodeComponent', () => {
  let component: FormatterOpcodeComponent;
  let fixture: ComponentFixture<FormatterOpcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatterOpcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatterOpcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

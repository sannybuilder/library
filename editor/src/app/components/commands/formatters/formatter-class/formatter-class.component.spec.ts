import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatterClassComponent } from './formatter-class.component';

describe('FormatterClassComponent', () => {
  let component: FormatterClassComponent;
  let fixture: ComponentFixture<FormatterClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatterClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatterClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

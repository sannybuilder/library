import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatterJsComponent } from './formatter-js.component';

describe('FormatterJsComponent', () => {
  let component: FormatterJsComponent;
  let fixture: ComponentFixture<FormatterJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatterJsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatterJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

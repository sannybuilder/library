import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumEditorComponent } from './enum-editor.component';

describe('EnumEditorComponent', () => {
  let component: EnumEditorComponent;
  let fixture: ComponentFixture<EnumEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnumEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

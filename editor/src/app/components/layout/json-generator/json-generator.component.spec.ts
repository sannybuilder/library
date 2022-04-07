import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonGeneratorComponent } from './json-generator.component';

describe('JsonGeneratorComponent', () => {
  let component: JsonGeneratorComponent;
  let fixture: ComponentFixture<JsonGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassListComponent } from './class-list.component';

describe('ClassListComponent', () => {
  let component: ClassListComponent;
  let fixture: ComponentFixture<ClassListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

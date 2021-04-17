import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassOverviewComponent } from './class-overview.component';

describe('ClassOverviewComponent', () => {
  let component: ClassOverviewComponent;
  let fixture: ComponentFixture<ClassOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

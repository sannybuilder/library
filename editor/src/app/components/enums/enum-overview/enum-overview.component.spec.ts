import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumOverviewComponent } from './enum-overview.component';

describe('EnumOverviewComponent', () => {
  let component: EnumOverviewComponent;
  let fixture: ComponentFixture<EnumOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnumOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

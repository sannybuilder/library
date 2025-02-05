import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotkeysInfoComponent } from './hotkeys-info.component';

describe('HotkeysInfoComponent', () => {
  let component: HotkeysInfoComponent;
  let fixture: ComponentFixture<HotkeysInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotkeysInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotkeysInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

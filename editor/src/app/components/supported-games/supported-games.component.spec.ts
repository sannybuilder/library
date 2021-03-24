import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportedGamesComponent } from './supported-games.component';

describe('SupportedGamesComponent', () => {
  let component: SupportedGamesComponent;
  let fixture: ComponentFixture<SupportedGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportedGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportedGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

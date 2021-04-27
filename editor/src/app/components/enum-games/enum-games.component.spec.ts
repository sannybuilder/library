import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumGamesComponent } from './enum-games.component';

describe('EnumGamesComponent', () => {
  let component: EnumGamesComponent;
  let fixture: ComponentFixture<EnumGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnumGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

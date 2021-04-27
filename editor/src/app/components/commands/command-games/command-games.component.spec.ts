import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandGamesComponent } from './command-games.component';

describe('CommandGamesComponent', () => {
  let component: CommandGamesComponent;
  let fixture: ComponentFixture<CommandGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandGamesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

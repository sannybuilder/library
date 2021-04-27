import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandInfoComponent } from './command-info.component';

describe('CommandInfoComponent', () => {
  let component: CommandInfoComponent;
  let fixture: ComponentFixture<CommandInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

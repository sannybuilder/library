import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumListComponent } from './enum-list.component';

describe('EnumListComponent', () => {
  let component: EnumListComponent;
  let fixture: ComponentFixture<EnumListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnumListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeammangeComponent } from './teammange.component';

describe('TeammangeComponent', () => {
  let component: TeammangeComponent;
  let fixture: ComponentFixture<TeammangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeammangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeammangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

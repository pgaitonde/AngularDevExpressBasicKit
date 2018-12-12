import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionDashboardComponent } from './position-dashboard.component';

describe('PositionDashboardComponent', () => {
  let component: PositionDashboardComponent;
  let fixture: ComponentFixture<PositionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

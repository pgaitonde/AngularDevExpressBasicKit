import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartModuleComponent } from './chart-module.component';

describe('ChartModuleComponent', () => {
  let component: ChartModuleComponent;
  let fixture: ComponentFixture<ChartModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

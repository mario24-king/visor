import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsStatitics } from './metrics';

describe('MetricsStatitics', () => {
  let component: MetricsStatitics;
  let fixture: ComponentFixture<MetricsStatitics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricsStatitics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricsStatitics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

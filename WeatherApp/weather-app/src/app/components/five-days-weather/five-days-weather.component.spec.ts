import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDaysWeatherComponent } from './five-days-weather.component';

describe('FiveDaysWeatherComponent', () => {
  let component: FiveDaysWeatherComponent;
  let fixture: ComponentFixture<FiveDaysWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiveDaysWeatherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiveDaysWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

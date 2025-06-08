import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentdayWeatherComponent } from './currentday-weather.component';

describe('CurrentdayWeatherComponent', () => {
  let component: CurrentdayWeatherComponent;
  let fixture: ComponentFixture<CurrentdayWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentdayWeatherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentdayWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

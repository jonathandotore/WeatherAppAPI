import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchCityService {

  private _citySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public city$: Observable<string> = this._citySubject.asObservable();

  constructor() { }

  setCity(city: string): void {
    this._citySubject.next(city);
  }

  getCity(): string {
    return this._citySubject.getValue();
  }

}

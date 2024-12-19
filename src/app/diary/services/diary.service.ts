import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  private fields: { [key: string]: BehaviorSubject<string> } = {};

  constructor() {
    this.fields['subject'] = new BehaviorSubject<string>('');
    this.fields['mood'] = new BehaviorSubject<string>('');
    this.fields['date'] = new BehaviorSubject<string>('');
    this.fields['note'] = new BehaviorSubject<string>('');
  }

  getField$(field: string): Observable<string> {
    return this.fields[field].asObservable();
  }

  setField(field: string, value: string): void {
      this.fields[field].next(value);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  isValidPeriod(firstDate: Date, secondDate : Date) : boolean {
    return firstDate.getTime() < secondDate.getTime();
  }

  isValidDate(startDate : Date) {
    const currentDate = new Date();
    return startDate.getTime() > currentDate.getTime();
  }
}

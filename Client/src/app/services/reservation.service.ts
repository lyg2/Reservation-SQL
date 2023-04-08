import { Time } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  validate(startTime:Time, endTime:Time){
    return startTime<endTime;
  }
}

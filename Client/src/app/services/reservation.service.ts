import { Time } from '@angular/common';
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
  isValidHour(startTime:Time, endTime:Time, startDate:Date, endDate:Date):boolean {
    const startTimeString:string= startTime+"";
    const startTimeHours=+startTimeString.substring(0,2);
    const startTimeSeconds=+startTimeString.substring(3,5);
    const endTimeString:string= endTime+"";
    const endTimeHours=+endTimeString.substring(0,2);
    const endTimeSeconds=+endTimeString.substring(3,5);
    if (startDate&&endDate){
      if( startDate.getDate()===endDate.getDate()){
           return !(startTimeHours>endTimeHours||(startTimeHours===endTimeHours&&startTimeSeconds>endTimeSeconds));
      }       
    }
    return true

}

}

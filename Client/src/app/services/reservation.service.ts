import { Time } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // validate(startTime:Time, endTime:Time){
  //   return startTime<endTime;
  // }

  isValidPeriod(firstDate: Date, secondDate : Date) : boolean {
    return firstDate.getTime() < secondDate.getTime();
  }

  isValidDate(startDate : Date) {
    const currentDate = new Date();
    return startDate.getTime() > currentDate.getTime();
  }
  isValidHour(startTime:Time, endTime:Time, startDate:Date, endDate:Date):boolean {
    

    console.log("Start time is " + startTime+ " End time is "+ endTime);
    const mastring:string= startTime+"";
    const numH1=+mastring.substring(0,2);
    const numS1=+mastring.substring(3,5);
    const mastring2:string= endTime+"";
    const numH2=+mastring2.substring(0,2);
    const numS2=+mastring2.substring(3,5);
    console.log(numH1,numS1,  numH2, numS2);
    if (startDate&&endDate){
      console.log(startDate.getMilliseconds(),endDate.getMilliseconds());

      console.log(startDate.getDate()===endDate.getDate());
      console.log(numH1>numH2||(numH1===numH2&&numS1>numS2));

      if( startDate.getDate()===endDate.getDate()){
           return !(numH1>numH2||(numH1===numH2&&numS1>numS2));
      }       
    }
    return true

  //}
}

}

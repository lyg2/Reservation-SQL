import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { CoopMember } from "../../../../common/tables/coop-member";
import {Reservation} from "../../../../common/tables/reservation"
import { Parking } from "../../../../common/tables/parking";
import { Car } from "../../../../common/tables/car";


@Injectable()
export class CommunicationService {

  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private readonly http: HttpClient) {}

  private _listeners: any = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  getMembersWithName(name: string): Observable<CoopMember[]> {
    return this.http
      .get<CoopMember[]>(this.BASE_URL + "/members/" + name)
      .pipe(catchError(this.handleError<CoopMember[]>("getMembersWithName")));
  }

  getDriverMembers(): Observable<CoopMember[]> {
    return this.http
      .get<CoopMember[]>(this.BASE_URL + "/members?drivers=true")
      .pipe(catchError(this.handleError<CoopMember[]>("getDriverMembers")));
  }

  getReservations(): Observable<Reservation[]> {
    return this.http
      .get<Reservation[]>(this.BASE_URL + "/reservations")
      .pipe(catchError(this.handleError<Reservation[]>("getReservations")));
  }

  getAllParkingNames(): Observable<Parking[]> {
    return this.http
      .get<Parking[]>(this.BASE_URL + "/parkings/name")
      .pipe(catchError(this.handleError<Parking[]>("getAllParkingNames")));
  }

  getFreeCars(location: string, firstPeriod: string, secondPeriod: string) {
    return this.http
    .get<Car[]>(this.BASE_URL+`/cars/free?location=${location}&periodStart=${firstPeriod}&periodEnd=${secondPeriod}`)
    .pipe(catchError(this.handleError<Car[]>("getFreeCars")));
  }

postReservation(reservation: Reservation): Observable<HttpResponse<string>> {
  return this.http
    .post<HttpResponse<string>>(this.BASE_URL + "/reservation", reservation)
    .pipe(catchError(this.handleError<HttpResponse<string>>("postReservation")));
}
  
  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}

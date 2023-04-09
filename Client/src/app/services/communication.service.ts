import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { CoopMember } from "../../../../common/tables/coop-member";
import {Reservation} from "../../../../common/tables/reservation"
import {Authentification} from '../../../../common/communication/authentification'
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

  getAllMembers(): Observable<CoopMember[]> {
    return this.http
      .get<CoopMember[]>(this.BASE_URL + "/members")
      .pipe(catchError(this.handleError<CoopMember[]>("getAllMembers")));
  }

  getMembersWithName(name: string): Observable<CoopMember[]> {
    return this.http
      .get<CoopMember[]>(this.BASE_URL + "/members/" + name)
      .pipe(catchError(this.handleError<CoopMember[]>("getMembersWithName")));
  }

  getReservations(): Observable<Reservation[]> {
    return this.http
      .get<Reservation[]>(this.BASE_URL + "/reservations/")
      .pipe(catchError(this.handleError<Reservation[]>("getReservations")));
  }

  getReservationsByLicensePlate(licensePlate: string): Observable<Reservation[]> {
    return this.http
      .get<Reservation[]>(this.BASE_URL + "/reservations/"+licensePlate)
      .pipe(catchError(this.handleError<Reservation[]>("getReservations")));
  }

  postLogin(authentification: Authentification): Observable<HttpResponse<string>> {
    return this.http.post(this.BASE_URL+'/login/', authentification, {
        observe: 'response',
        responseType: 'text',
    });
}
  getAllParkingNames(): Observable<Parking[]> {
    return this.http
      .get<Parking[]>(this.BASE_URL + "/parkings/name")
      .pipe(catchError(this.handleError<Parking[]>("getAllParkingNames")));
  }

  getAllCars(): Observable<Car[]> {
    return this.http
      .get<Car[]>(this.BASE_URL + "/cars")
      .pipe(catchError(this.handleError<Car[]>("getAllCars")));
  }

  getCarsByParkingName(name: string): Observable<Car[]> {
    console.log(name);
    return this.http
    .get<Car[]>(this.BASE_URL + "/cars/" + name)
    .pipe(catchError(this.handleError<Car[]>("getCarsByParkingName")));
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

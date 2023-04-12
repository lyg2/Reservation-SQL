import { ReservationService } from './../../services/reservation.service';
import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import { Parking } from '../../../../../common/tables/parking'
import { Car } from '../../../../../common/tables/car';
import { DatePipe } from '@angular/common';
import { CoopMember } from '../../../../../common/tables/coop-member';
import { Reservation } from '../../../../../common/tables/reservation';
import { Router } from '@angular/router';

import {ErrorStateMatcher} from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
  providers: [DatePipe],
})
export class ReservationFormComponent implements OnInit {
  memberId: string;
  licensePlate: string;
  startTime:Time;
  endTime:Time;
  startTimestamp: string;
  endTimestamp: string;
  location: Parking;
  startDate: Date;
  minDate: Date;
  maxDate: Date;
  endDate: Date;
  requirements: string | null;
  locations: Parking[];
  filteredCars: Car[];
  members: CoopMember [];

  startDateFormControl = new FormControl('', [Validators.required]);
  endDateFormControl = new FormControl('', [Validators.required]);
  startHourFormControl = new FormControl('', [Validators.required]);
  endHourFormControl  = new FormControl('', [Validators.required]);
  locationFormControl =  new FormControl('', [Validators.required]);
  carSelectFormControl=  new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(private reservationService:ReservationService, private communicationService: CommunicationService, private datePipe: DatePipe, private router: Router) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getUTCMonth();
    const currentDay = new Date().getUTCDate()+1;

    this.minDate = new Date(currentYear, currentMonth, currentDay);
    this.maxDate = new Date(currentYear, 11, 31);

    this.setDefaultValues(currentYear);
  }

  ngOnInit(): void {
    this.getAllParkingNames();
    this.getDriverMembers();
  }

  onSubmit(): void { 
    if (this.licensePlate && this.memberId) {
      const reservation: Reservation = {
        reservedperiod: `('${this.startTimestamp}','${this.endTimestamp}')`,
        idmember: this.memberId,
        licenseplate: this.licensePlate,
        requirements: this.requirements ,
      } as Reservation;
      this.communicationService.postReservation(reservation).subscribe(() => {
        this.router.navigate(['/reservations/create/successful']);
      });
    }
   }

  private getAllParkingNames(): void {
    this.communicationService.getAllParkingNames().subscribe(parkingNames => this.locations = parkingNames)
  }

  manageFreeCars(): void {
    this.filteredCars = [];
    if (!this.hasDefinedInput()) {
      return;
    }

    const startDateString = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    const endDateString = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');

    this.startTimestamp = this.buildTimestamp(startDateString as string, this.startTime);
    this.endTimestamp = this.buildTimestamp(endDateString as string, this.endTime);

    const firstDate: Date = this.extractDateFromTimestamp(this.startTimestamp);
    const secondDate: Date = this.extractDateFromTimestamp(this.endTimestamp);

    if(!this.reservationService.isValidPeriod(firstDate, secondDate) || !this.reservationService.isValidDate(firstDate)) {
      this.licensePlate = '';
      return;
    }

    this.communicationService.getFreeCars(this.location.parkingname, this.startTimestamp, this.endTimestamp)
    .subscribe((cars : Car [])=> {
      this.filteredCars=cars;
    });
  }

  private setDefaultValues(currentYear: number): void {
    this.startDate = new Date(currentYear, 10, 12);
    this.endDate = new Date(currentYear, 10, 12);
    // this.startTime = { hours: 9, minutes: 0 };
    // this.endTime= { hours: 10, minutes: 0 };
    this.memberId = '1';
    this.requirements= 'Voiture automatique';
  }

  private buildTimestamp(dateString: string, time: Time): string {
    return `${dateString} ${time}:00`;
  }

  private extractDateFromTimestamp(dateString: string): Date {
    return new Date(dateString.replace(/-/g, '/'));
  }

  private getDriverMembers() : void {
    this.communicationService.getDriverMembers()
    .subscribe((members : CoopMember [])=> {
      this.members=members;
    });
  }

  public hasDefinedInput(): boolean {
    return this.startDate 
    && this.endDate 
    && this.location 
    && this.startTime != undefined 
    && this.endTime != undefined;
  } 
}


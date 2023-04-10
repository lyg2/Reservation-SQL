import { ReservationService } from './../../services/reservation.service';
import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import { Parking } from '../../../../../common/tables/parking'
import { Car } from '../../../../../common/tables/car';
//import { Reservation } from '../../../../../common/tables/reservation';
import { DatePipe } from '@angular/common';
import { CoopMember } from '../../../../../common/tables/coop-member';
import { Reservation } from '../../../../../common/tables/reservation';
import { Router } from '@angular/router';

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
  endDate: Date;
  requirements: string | null = null;
  locations: Parking[];
  filteredCars: Car[];
  members: CoopMember [];
  // cars: Car[];
  // cars = ['Tesla', 'Mazda', 'BMW', 'Subaru', 'Porsche', 'Honda', 'Lexus', 'Toyota', 'Chrysler', 'Buick',  'Hyundai'];
  // models = ['Hybride', 'Automobile régulières', 'Mini-camionettes'];
  //fetch locations
  // locations=['Gare d\'autocars de Sainte-Catherine','Gare d\'autocars de Saint-Sauveur','Gare d\'autocars de Champlain' ]
  //fetch postal adresses
  // postalAdresses=['H3B 1A6','H4N 3K1', 'H8N 1X1'];
  
  //reservations: Reservation [] = [];

  constructor(private reservationService:ReservationService, private communicationService: CommunicationService, private datePipe: DatePipe, private router: Router) {}

  ngOnInit(): void {
    this.getAllParkingNames();
    // this.getAllCars();
    this.getDriverMembers();
  }

  // onValidate(): void {
  //   if (this.reservationService.validate(this.startTime, this.endTime))
  //     this.onSubmit();
  // }

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
    // TODO: allow user to reserved for multiple days

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

    console.log(this.startTimestamp);
    console.log(this.endTimestamp);
    
    //TODO: use get instead of post
    this.communicationService.getFreeCars(this.location.parkingname, this.startTimestamp, this.endTimestamp)
    .subscribe((cars : Car [])=> {
      this.filteredCars=cars;
    });
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
      // console.log(this.members);
    });
  }

  private hasDefinedInput(): boolean {
    return this.startDate 
    && this.endDate 
    && this.location 
    && this.startTime != undefined 
    && this.endTime != undefined;
  } 
}


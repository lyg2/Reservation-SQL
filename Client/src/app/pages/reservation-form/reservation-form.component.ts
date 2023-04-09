import { ReservationService } from './../../services/reservation.service';
import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import { Parking } from '../../../../../common/tables/parking'
import { Car } from '../../../../../common/tables/car';
import { Reservation } from '../../../../../common/tables/reservation';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
  providers: [DatePipe],
})
export class ReservationFormComponent implements OnInit {
  @Input('startHour') startTime:Time;
  @Input('endHour') endTime:Time;
  cars: Car[];
  // cars = ['Tesla', 'Mazda', 'BMW', 'Subaru', 'Porsche', 'Honda', 'Lexus', 'Toyota', 'Chrysler', 'Buick',  'Hyundai'];
  models = ['Hybride', 'Automobile régulières', 'Mini-camionettes'];
  //fetch locations
  // locations=['Gare d\'autocars de Sainte-Catherine','Gare d\'autocars de Saint-Sauveur','Gare d\'autocars de Champlain' ]
  //fetch postal adresses
  postalAdresses=['H3B 1A6','H4N 3K1', 'H8N 1X1'];
  submitted = false;
  locations: Parking[];
  location: Parking;
  filteredCars: Car[];
  reservations: Reservation [] = [];
  selectedDate: Date;

  constructor( private reservationService:ReservationService, private communicationService: CommunicationService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.getAllParkingNames();
    this.getAllCars();
  }

  onValidate(): void {
    console.log(this.startTime);
    const startTime:Time=this.startTime;
    const endTime:Time=this.endTime;
    if (this.reservationService.validate(startTime, endTime))
      this.onSubmit();
  }

  onSubmit(): void { this.submitted = true; }

  private getAllParkingNames(): void {
    this.communicationService.getAllParkingNames().subscribe(parkingNames => this.locations = parkingNames)
  }

  private getAllCars(): void {
    this.communicationService.getAllCars().subscribe(cars => this.cars = cars)
  }

  manageLocationChoice(event: any): void {
    this.location = event.value;
    // this.filteredCars = this.cars.filter((car: Car) => {
    //   return car.parkingname === this.location.parkingname;
    // })
    this.reservations = [];
    console.log(this.selectedDate);
    this.communicationService.getCarsByParkingName(this.location.parkingname).subscribe(cars => this.filteredCars = cars);
  }

  manageCarChoice(event: any): void {
    const licensePlate: string = event.value;
    console.log(this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd'));
    console.log(licensePlate);
    this.communicationService.getReservationsByLicensePlate(licensePlate).subscribe((reservations: Reservation [])=> {
      this.reservations = reservations;
      console.log(this.reservations);
    });
  }
}


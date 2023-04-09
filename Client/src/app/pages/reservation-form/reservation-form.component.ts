import { ReservationService } from './../../services/reservation.service';
import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import { Parking } from '../../../../../common/tables/parking'

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {
  @Input('startHour') startTime:Time;
  @Input('endHour') endTime:Time;
  cars = ['Tesla', 'Mazda', 'BMW', 'Subaru', 'Porsche', 'Honda', 'Lexus', 'Toyota', 'Chrysler', 'Buick',  'Hyundai'];
  models = ['Hybride', 'Automobile régulières', 'Mini-camionettes'];
  //fetch locations
  // locations=['Gare d\'autocars de Sainte-Catherine','Gare d\'autocars de Saint-Sauveur','Gare d\'autocars de Champlain' ]
  //fetch postal adresses
  postalAdresses=['H3B 1A6','H4N 3K1', 'H8N 1X1'];
  submitted = false;
  locations: Parking[];

  constructor( private reservationService:ReservationService, private communicationService: CommunicationService) {}

  ngOnInit(): void {
    this.getAllParkingNames();
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
}

import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs/internal/Observable';
import { Reservation } from '../../../../../common/tables/reservation';
import { MatTableDataSource } from '@angular/material/table';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
    query: string;
    obs: Observable<Reservation[]>;
    dataSource: MatTableDataSource<Reservation>;

    constructor(private changeDetectorRef: ChangeDetectorRef, private readonly communicationService: CommunicationService) {}

    ngOnInit(): void {
      this.getReservations();
    };

    getReservations(): void {
      this.communicationService.getReservations().subscribe((reservations: Reservation [])=> {
        this.dataSource = new MatTableDataSource<Reservation>(reservations);
        this.changeDetectorRef.detectChanges();
        this.obs = this.dataSource.connect();
        this.dataSource.paginator = this.paginator;

      });
    }

}

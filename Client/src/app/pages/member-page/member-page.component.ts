import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {CoopMember} from '../../../../../common/tables/coop-member';
import { Observable } from 'rxjs/internal/Observable';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommunicationService } from 'src/app/services/communication.service';

// const DATA : CoopMember [] = [
//   {
//     idMember: '007',
//     idBankAccount: 'DDD',
//     memberName: 'John Doe',
//     preferredParking: 'Ghetto',
//     memberPassword: 'password',
//     licenseNo: '0123456',
//     entityType: 'PERSON',
//     birthDate: '2000/02/22',
//     lastAccidentDate: '2020/01/01',
//     mailingAdress: 'johndoe@example.com',
//     email: 'johndoe@example.com',
//     annualMembership : 50,
//   },
//   {
//     idMember: '007',
//     idBankAccount: 'DDD',
//     memberName: 'John Doe',
//     preferredParking: 'Ghetto',
//     memberPassword: 'password',
//     licenseNo: '0123456',
//     entityType: 'PERSON',
//     birthDate: '2000/02/22',
//     lastAccidentDate: '2020/01/01',
//     mailingAdress: 'Enfer',
//     email: 'johndoe@example.com',
//     annualMembership : 50,
//   }
// ]

@Component({
  selector: 'app-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.css']
})
export class MemberPageComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    query: string;
    obs: Observable<CoopMember[]>;
    dataSource: MatTableDataSource<CoopMember>;

    constructor(private changeDetectorRef: ChangeDetectorRef, private readonly communicationService: CommunicationService) {}

    ngOnInit(): void {
      this.getAllMembers();
    };

    getAllMembers(): void {
      this.communicationService.getAllMembers().subscribe((members: CoopMember [])=> {
        this.setUpData(members);
      });
    }

    getMembersWithName(): void {
      this.communicationService.getMembersWithName(this.query.toLowerCase()).subscribe((members: CoopMember [])=> {
        this.setUpData(members);
      });
    }

    sendQuery(): void {
      this.getMembersWithName();
    }

    private setUpData(members: CoopMember[]): void {
      this.dataSource = new MatTableDataSource<CoopMember>(members);
      this.changeDetectorRef.detectChanges();
      this.obs = this.dataSource.connect();
      this.dataSource.paginator = this.paginator;

    }

}

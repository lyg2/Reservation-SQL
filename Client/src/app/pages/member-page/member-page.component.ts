import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {CoopMember} from '../../../../../common/tables/coop-member';
import { Observable } from 'rxjs/internal/Observable';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

const DATA : CoopMember [] = [
  {
    idMember: '007',
    idBankAccount: 'DDD',
    memberName: 'John Doe',
    preferredParking: 'Ghetto',
    memberPassword: 'password',
    licenseNo: '0123456',
    entityType: 'PERSON',
    birthDate: '2000/02/22',
    lastAccidentDate: '2020/01/01',
    mailingAdress: 'johndoe@example.com',
    email: 'johndoe@example.com',
    annualMembership : 50,
  },
  {
    idMember: '007',
    idBankAccount: 'DDD',
    memberName: 'John Doe',
    preferredParking: 'Ghetto',
    memberPassword: 'password',
    licenseNo: '0123456',
    entityType: 'PERSON',
    birthDate: '2000/02/22',
    lastAccidentDate: '2020/01/01',
    mailingAdress: 'Enfer',
    email: 'johndoe@example.com',
    annualMembership : 50,
  }
]

@Component({
  selector: 'app-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.css']
})
export class MemberPageComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    obs: Observable<CoopMember[]>;
    dataSource: MatTableDataSource<CoopMember>;

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
      this.dataSource = new MatTableDataSource<CoopMember>(DATA);
      this.changeDetectorRef.detectChanges();
      this.obs = this.dataSource.connect();
      this.dataSource.paginator = this.paginator;
    };

}

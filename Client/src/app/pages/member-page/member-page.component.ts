import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {CoopMember} from '../../../../../common/tables/coop-member';
import { Observable } from 'rxjs/internal/Observable';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.css']
})
export class MemberPageComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    query: string= '';
    obs: Observable<CoopMember[]>;
    dataSource: MatTableDataSource<CoopMember>;
    id: string;
    password: string;

    constructor(private changeDetectorRef: ChangeDetectorRef, private readonly communicationService: CommunicationService) {}

    ngOnInit(): void {
      this.getMembersWithName();
    };

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

import { Component } from '@angular/core';
import {CoopMember} from '../../../../../common/tables/coop-member';
import { Observable } from 'rxjs/internal/Observable';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.css']
})
export class MemberPageComponent {

    obs: Observable<CoopMember[]>;
    dataSource: MatTableDataSource<CoopMember[]>;

}

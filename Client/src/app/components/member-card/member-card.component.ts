import { Component, Input } from '@angular/core';
import { CoopMember } from '../../../../../common/tables/coop-member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  @Input() memberCard: CoopMember;
  
}

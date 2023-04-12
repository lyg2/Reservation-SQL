import { Component, Input } from '@angular/core';
import { CoopMember } from '../../../../../common/tables/coop-member';
import { PersonType } from 'src/app/consts/consts';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent  {
  @Input() memberCard: CoopMember;

  getPersonType(type : string): string {
    switch (type) {
      case PersonType.Physical:
          return 'Physique';
      case PersonType.Moral:
          return 'Morale;';
      default:
        return 'N/A';
  }

  }
  
  
}

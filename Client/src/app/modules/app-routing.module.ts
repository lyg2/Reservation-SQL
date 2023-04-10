import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { ReservationComponent } from "../pages/reservation/reservation.component";
import { CreateReservationComponent } from "../pages/create-reservation/create-reservation.component";
import { MemberPageComponent } from "../pages/member-page/member-page.component";
import { SuccessfulReservationComponent } from "../pages/successful-reservation-page/successful-reservation-page.component.ts";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "reservations", component: ReservationComponent },
  { path: "reservations/create", component: CreateReservationComponent },
  { path: "member-page", component: MemberPageComponent},
  { path: "reservations/create/successful", component: SuccessfulReservationComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

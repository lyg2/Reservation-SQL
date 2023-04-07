import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { ReservationComponent } from "../pages/reservation/reservation.component";
import { CreateReservationComponent } from "../pages/create-reservation/create-reservation.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "reservation", component: ReservationComponent },
  { path: "reservation/create", component: CreateReservationComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

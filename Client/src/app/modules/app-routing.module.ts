import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { ReservationComponent } from "../reservation/reservation.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "app/reservation", component: ReservationComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

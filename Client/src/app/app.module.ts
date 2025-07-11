import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./services/communication.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { CreateReservationComponent } from './pages/create-reservation/create-reservation.component';
import { MemberPageComponent } from './pages/member-page/member-page.component';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { ReservationFormComponent } from './pages/reservation-form/reservation-form.component';
import { MaterialModule } from './modules/material.module';
import { ReservationCardComponent } from './components/reservation-card/reservation-card.component';
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { SuccessfulReservationComponent } from "./pages/successful-reservation-page/successful-reservation-page.component.ts";


@NgModule({
  declarations: [
    AppComponent,
    ReservationComponent,
    CreateReservationComponent,
    MemberPageComponent,
    MemberCardComponent,
    ReservationFormComponent,
    ReservationCardComponent,
    SuccessfulReservationComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports:[ReservationFormComponent],
  providers: [
    CommunicationService,
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

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
import { ReservationFormComponent } from './pages/reservation-form/reservation-form.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    ReservationComponent,
    CreateReservationComponent,
    MemberPageComponent,
    ReservationFormComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [CommunicationService],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

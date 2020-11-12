import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { PrimeNgModule } from './modules/prime-ng/prime-ng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { NewAppointmentComponent } from './components/new-appointment/new-appointment.component';
import { MyAppointmentsComponent } from './components/my-appointments/my-appointments.component';
import { AccountComponent } from './components/account/account.component';
import { ErrorComponent } from './components/error/error.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { AvailabilityComponent } from './components/availability/availability.component';
import { DayOfWeekPipe } from './pipes/day-of-week.pipe';
import { DayPipe } from './pipes/day.pipe';
import { AdminComponent } from './components/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { PickSpecialtyComponent } from './components/new-appointment/pick-specialty/pick-specialty.component';
import { PickProfessionalComponent } from './components/new-appointment/pick-professional/pick-professional.component';
import { PickDateTimeComponent } from './components/new-appointment/pick-date-time/pick-date-time.component';
import { AppointmentSummaryComponent } from './components/new-appointment/appointment-summary/appointment-summary.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    HomeComponent,
    NewAppointmentComponent,
    MyAppointmentsComponent,
    AccountComponent,
    ErrorComponent,
    ScheduleComponent,
    AvailabilityComponent,
    DayOfWeekPipe,
    DayPipe,
    AdminComponent,
    PickSpecialtyComponent,
    PickProfessionalComponent,
    PickDateTimeComponent,
    AppointmentSummaryComponent,
    StatisticsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    PrimeNgModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

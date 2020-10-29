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
import { AvaliabilityComponent } from './components/avaliability/avaliability.component';
import { DayOfWeekPipe } from './pipes/day-of-week.pipe';
import { DayPipe } from './pipes/day.pipe';
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
    AvaliabilityComponent,
    DayOfWeekPipe,
    DayPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    PrimeNgModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

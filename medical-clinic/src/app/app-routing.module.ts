import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvaliabilityComponent } from './components/avaliability/avaliability.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyAppointmentsComponent } from './components/my-appointments/my-appointments.component';
import { NewAppointmentComponent } from './components/new-appointment/new-appointment.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'new-appointment', component: NewAppointmentComponent },
      { path: 'my-appointments', component: MyAppointmentsComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'avaliability', component: AvaliabilityComponent },
    ],
  },
  { path: '**', component: ErrorComponent },
  { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

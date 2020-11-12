import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AvailabilityComponent } from './components/availability/availability.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyAppointmentsComponent } from './components/my-appointments/my-appointments.component';
import { NewAppointmentComponent } from './components/new-appointment/new-appointment.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
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
      { path: 'availability', component: AvailabilityComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'statistics', component: StatisticsComponent },
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

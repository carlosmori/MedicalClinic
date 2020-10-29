import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { formatISO } from 'date-fns/fp';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  todayAppointments: any[];
  futureAppointments: any[];
  currentUser: any;
  appointments: any[];

  constructor(private appointmentService: AppointmentService, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();
    this.appointmentService
      .getDoctorAppointments({ professionalId: this.currentUser.uid })
      .subscribe((appointments) => {
        const dateIso = formatISO(new Date());
        this.todayAppointments = appointments.filter((appointment) => appointment.day < dateIso);
        this.futureAppointments = appointments.filter((appointment) => appointment.day > dateIso);

        this.appointments = appointments;
        console.log('Variable: this.appointments Stringify');
        console.log(JSON.stringify(this.appointments));
      });
  }
}

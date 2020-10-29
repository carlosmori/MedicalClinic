import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/classes/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss'],
})
export class MyAppointmentsComponent implements OnInit {
  // appointments: Appointment[];
  appointments: any[];

  constructor(private appointmentService: AppointmentService) {
    this.appointmentService.getAppointmentById({ patientId: null }).subscribe((appointments) => {
      this.appointments = appointments;
    });
  }

  ngOnInit(): void {}
  cancelAppointment(appointment) {
    console.log('Variable: appointment equals');
    console.log(appointment);
    this.appointmentService
      .updateAppointment({
        appointmentId: appointment.appointmentId,
        appointment: { status: 'Cancelled' },
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log('Variable: err equals');
        console.log(err);
      });
  }
}

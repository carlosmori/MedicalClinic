import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/classes/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss'],
})
export class MyAppointmentsComponent implements OnInit {
  appointments: any[];
  display = false;
  content: any;
  doctorSummary: any;
  currentAppointment: any;
  patientSurvey: any;
  currentUser: any;

  constructor(private appointmentService: AppointmentService, private authService: AuthService) {
    this.currentUser = this.authService.currentUser();
    this.appointmentService.getPatientAppointments({ patientId: this.currentUser.uid }).subscribe((appointments) => {
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
  showSummaryDialog(doctorSummary) {
    this.display = true;
    this.content = doctorSummary;
  }
  showPatientSurveyDialog(appointment) {
    this.display = true;
    this.currentAppointment = appointment;
  }
  hideDialog() {
    this.currentAppointment = null;
    this.content = null;
  }
  confirmReview() {
    this.display = false;
    this.appointmentService.updateAppointment({
      appointmentId: this.currentAppointment.appointmentId,
      appointment: { patientSurvey: this.patientSurvey },
    });
  }
}

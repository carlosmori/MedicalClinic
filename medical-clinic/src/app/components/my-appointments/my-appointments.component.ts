import { Component, OnInit, ViewChild } from '@angular/core';
import { Appointment } from 'src/app/classes/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DayPipe } from 'src/app/pipes/day.pipe';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [style({ opacity: 0 }), animate(600)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave', animate(600, style({ opacity: 0 }))),
    ]),
  ],
  providers: [DayPipe],
})
export class MyAppointmentsComponent implements OnInit {
  appointments: any[];
  display = false;
  content: any;
  doctorSummary: any;
  currentAppointment: any;
  patientSurvey: any;
  currentUser: any;
  @ViewChild('dt') table: Table;
  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private dayPipe: DayPipe
  ) {
    this.currentUser = this.authService.currentUser();
    this.appointmentService.getPatientAppointments({ patientId: this.currentUser.uid }).subscribe((appointments) => {
      this.appointments = appointments.map((appointment) => ({
        ...appointment,
        parsedDay: this.dayPipe.transform(appointment.day),
      }));
    });
  }

  ngOnInit(): void {}
  cancelAppointment(appointment) {
    this.appointmentService
      .updateAppointment({
        appointment: { ...appointment, status: 'Cancelled' },
        professionalId: appointment.professional.uid,
        patientId: this.currentUser.uid,
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log('Variable: err equals');
        console.log(err);
      });
  }
  showSummaryDialog(doctorSummary) {
    this.display = true;
    this.content = doctorSummary.extraNotes ? doctorSummary.extraNotes : doctorSummary;
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
      appointment: { ...this.currentAppointment, patientSurvey: this.patientSurvey },
      professionalId: this.currentAppointment.professional.uid,
      patientId: this.currentUser.uid,
    });
  }
}

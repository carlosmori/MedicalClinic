import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { formatISO } from 'date-fns/fp';
import { DocumentsExportService } from 'src/app/services/documents-export.service';

import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
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
})
export class ScheduleComponent implements OnInit {
  todayAppointments: any[];
  futureAppointments: any[];
  currentUser: any;
  appointments: any[];
  display: boolean;
  patientSurvey: any;
  currentAppointment: any;
  doctorSummary: any;

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private documentExportService: DocumentsExportService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();
    this.appointmentService
      .getDoctorAppointments({ professionalId: this.currentUser.uid })
      .subscribe((appointments) => {
        const dateIso = formatISO(new Date());
        this.todayAppointments = appointments.filter((appointment) => appointment.day < dateIso);
        this.futureAppointments = appointments.filter((appointment) => appointment.day > dateIso);

        this.appointments = appointments;
      });
  }
  generateExcelFile(data) {
    // todo format array before creating excel file
    const fileName = `appointments-schedule-${new Date().getTime}`;
    this.documentExportService.exportAsExcelFile(data, fileName);
  }
  generatePdfFile(data) {
    const fileName = `appointments-schedule-${new Date().getTime}`;
    this.documentExportService.savePdfFile(data, fileName);
  }
  cancelAppointment(appointment) {
    this.appointmentService
      .updateAppointment({
        appointmentId: appointment.appointmentId,
        appointment: { ...appointment, status: 'Cancelled' },
        patientId: appointment.patient.uid,
        professionalId: this.currentUser.uid,
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log('Variable: err equals');
        console.log(err);
      });
  }
  attendPatient(appointment) {
    this.appointmentService
      .updateAppointment({
        appointmentId: appointment.appointmentId,
        appointment: { status: 'Closed' },
        patientId: appointment.patient.uid,
        professionalId: this.currentUser.uid,
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log('Variable: err equals');
        console.log(err);
      });
  }
  showPatientSurveyDialog(appointment) {
    this.display = true;
    this.patientSurvey = appointment.patientSurvey;
  }
  showDoctorSurveyDialog(appointment) {
    this.display = true;
    this.currentAppointment = appointment;
  }
  hideDialog() {
    this.patientSurvey = null;
    // this.content = null;
  }
  confirmReview() {
    this.display = false;
    this.appointmentService.updateAppointment({
      appointmentId: this.currentAppointment.appointmentId,
      appointment: { doctorSummary: this.doctorSummary },
      patientId: this.currentAppointment.patient.uid,
      professionalId: this.currentUser.uid,
    });
  }
}

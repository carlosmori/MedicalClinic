import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { formatISO } from 'date-fns/fp';
import { DocumentsExportService } from 'src/app/services/documents-export.service';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { Table } from 'primeng/table';
import { DayPipe } from 'src/app/pipes/day.pipe';
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
  providers: [DayPipe],
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
  age: number;
  temperature: string;
  bloodPresure: string;
  extraNotes: string;
  @ViewChild('dt') table: Table;
  @ViewChild('dt2') table2: Table;
  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private documentExportService: DocumentsExportService,
    private dayPipe: DayPipe
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();
    this.appointmentService
      .getDoctorAppointments({ professionalId: this.currentUser.uid })
      .subscribe((appointments) => {
        const dateIso = formatISO(new Date());
        this.todayAppointments = appointments
          .filter((appointment) => appointment.day < dateIso)
          .map((appointment) => ({ ...appointment, day: this.dayPipe.transform(appointment.day) }));
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
        appointment: { ...appointment, status: 'Closed' },
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
    this.age = null;
    this.temperature = null;
    this.bloodPresure = null;
    this.extraNotes = null;
    // this.content = null;
  }
  confirmReview() {
    this.display = false;
    this.doctorSummary = {
      age: this.age,
      temperature: this.temperature,
      bloodPresure: this.bloodPresure,
      extraNotes: this.extraNotes,
    };
    this.appointmentService.updateAppointment({
      appointment: { ...this.currentAppointment, doctorSummary: this.doctorSummary },
      patientId: this.currentAppointment.patient.uid,
      professionalId: this.currentUser.uid,
    });
  }
}

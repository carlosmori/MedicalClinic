import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from 'src/app/classes/appointment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-appointment-summary',
  templateUrl: './appointment-summary.component.html',
  styleUrls: ['./appointment-summary.component.scss'],
})
export class AppointmentSummaryComponent implements OnInit {
  @Input() appointmentSpecialty;
  @Input() appointmentProfessional;
  @Input() appointmentDay;
  @Input() appointmentHour;
  @Output() saveAppointment = new EventEmitter<any>();
  currentUser: any;
  appointment: Appointment;

  constructor(private authService: AuthService) {
    this.appointment = new Appointment();
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();
  }

  confirmAppointment() {
    // Professional
    this.appointment.professional.uid = this.appointmentProfessional.uid;
    this.appointment.professional.name = this.appointmentProfessional.name;
    this.appointment.professional.specialty = this.appointmentSpecialty;
    // Patient
    this.appointment.patient.uid = this.currentUser.uid;
    this.appointment.patient.name = this.currentUser.name;
    this.appointment.patient.email = this.currentUser.email;
    // Day & Hour
    this.appointment.day = this.appointmentDay;
    this.appointment.hour = this.appointmentHour;
    this.saveAppointment.emit(this.appointment);
  }
}

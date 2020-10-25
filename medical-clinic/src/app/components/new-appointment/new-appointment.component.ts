import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Appointment } from 'src/app/classes/appointment';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss'],
})
export class NewAppointmentComponent implements OnInit {
  items: MenuItem[];
  specialties: SelectItem[];
  professionals: SelectItem[];
  avaliableDays: SelectItem[];
  avaliableHours: SelectItem[];

  submitted = false;
  appointment: Appointment;
  activeIndex = 0;
  appointmentDay: string;
  appointmentHour: string;

  constructor(private router: Router) {
    this.appointment = new Appointment();
    // todo Mock Inputs so its easier to debug, undo this before prod
    this.appointment.specialty = 'cardiology';
    this.appointment.professional = '1';
    this.appointmentDay = '10/29/2020';
    this.appointmentHour = '08:00 AM';
    // todo this is a Mock from the API call
    this.specialties = [
      {
        label: 'List of Specialties',
        value: null,
      },
      {
        label: 'Cardiology',
        value: 'cardiology',
      },
      {
        label: 'Clinic',
        value: 'clinic',
      },
    ];
    this.professionals = [
      {
        label: 'List of Professionals',
        value: null,
      },
      {
        label: 'Diaz',
        value: '1',
      },
      {
        label: 'Suarez',
        value: '2',
      },
    ];
    this.avaliableDays = [
      {
        label: 'List of Days',
        value: null,
      },
      {
        label: 'October 29',
        value: '10/29/2020',
      },
      {
        label: 'October 30',
        value: '10/30/2020',
      },
    ];
    this.avaliableHours = [
      {
        label: 'List of Doctors',
        value: null,
      },
      {
        label: '08:00 AM',
        value: '08:00 AM',
      },
      {
        label: '08:00 AM',
        value: '08:00 AM',
      },
    ];
  }
  ngOnInit(): void {
    this.items = [
      {
        label: 'Specialty',
      },
      {
        label: 'Doctor',
      },
      {
        label: 'Date & Time',
      },
      {
        label: 'Confirmation',
      },
    ];
  }
  nextPage() {
    this.activeIndex += 1;
    console.log(this.appointment);
    if (this.activeIndex === 2) {
      // * Concat Date and Hour, implement a datePicker for next iteration
      this.appointment.dateTime = `${this.appointmentDay} ${this.appointmentHour}`;
    }
    // if (this.appointment.specialty) {
    //   // this.ticketService.ticketInformation.personalInformation = this.personalInformation;
    //   // this.router.navigate(['steps/seat']);
    //   return;
    // }
    this.submitted = true;
  }
  confirmAppointment() {
    // todo persist appointment in database
    console.log('Confirm');
  }
}

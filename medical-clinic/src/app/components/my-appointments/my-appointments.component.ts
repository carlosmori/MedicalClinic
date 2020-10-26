import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/classes/appointment';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss'],
})
export class MyAppointmentsComponent implements OnInit {
  // appointments: Appointment[];
  appointments: any[];

  constructor() {
    // todo mock api call
    this.appointments = [
      {
        status: 'Active',
        date: '10/30/2020 08:00AM',
        specialty: 'Cardiology',
        professional: 'Dr Suarez',
      },
      {
        status: 'Cancelled',
        date: '10/25/2020 08:00AM',
        specialty: 'Pediathry',
        professional: 'Dr Mori',
      },
      {
        status: 'Pending Review',
        date: '10/20/2020 08:00AM',
        specialty: 'Trauma',
        professional: 'Dr Mori',
      },
      {
        status: 'Closed',
        date: '09/12/2020 08:00AM',
        specialty: 'Clinic',
        professional: 'Dr Diaz',
      },
    ];
  }

  ngOnInit(): void {}
}

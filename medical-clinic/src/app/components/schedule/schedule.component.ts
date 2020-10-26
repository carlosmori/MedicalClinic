import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  todayAppointments: any[];
  futureAppointments: any[];

  constructor() {
    // todo mock api call
    this.todayAppointments = [
      {
        status: 'Active',
        date: '10/30/2020 08:00AM',
        patient: 'Carlos Mori',
      },
      {
        status: 'Cancelled',
        date: '10/25/2020 08:00AM',
        patient: 'Richard Suarez',
      },
      {
        status: 'Closed',
        date: '10/20/2020 08:00AM',
        patient: 'Fabricio Peretti',
      },
      {
        status: 'Pending Review',
        date: '09/12/2020 08:00AM',
        patient: 'Mauro Diaz',
      },
    ];
    this.futureAppointments = [
      {
        status: 'Active',
        date: '10/30/2020 08:00AM',
        patient: 'Carlos Mori',
      },
      {
        status: 'Cancelled',
        date: '10/25/2020 08:00AM',
        patient: 'Richard Suarez',
      },
      {
        status: 'Closed',
        date: '10/20/2020 08:00AM',
        patient: 'Fabricio Peretti',
      },
      {
        status: 'Pending Review',
        date: '09/12/2020 08:00AM',
        patient: 'Mauro Diaz',
      },
    ];
  }

  ngOnInit(): void {}
}

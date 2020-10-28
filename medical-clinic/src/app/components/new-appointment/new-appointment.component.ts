import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Appointment } from 'src/app/classes/appointment';
import { SelectItem } from 'primeng/api';
import { DoctorService } from 'src/app/services/doctor.service';
import { addDays, format, formatISO } from 'date-fns/fp';
import { DayOfWeekPipe } from 'src/app/pipes/day-of-week.pipe';
import { getDay } from 'date-fns';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss'],
  providers: [DayOfWeekPipe],
})
export class NewAppointmentComponent implements OnInit {
  items: MenuItem[];
  specialties: SelectItem[];
  professionals: SelectItem[];
  avaliableDays: SelectItem[] = [];
  avaliableHours: SelectItem[];

  submitted = false;
  appointment: Appointment;
  activeIndex = 0;
  doctors: any[];
  selectedDoctor: any;
  professionalName: any;
  selectedDateParsed: string;

  constructor(private router: Router, private doctorService: DoctorService, private dayOfWeekPipe: DayOfWeekPipe) {
    this.appointment = new Appointment();
    // todo Mock Inputs so its easier to debug, undo this before prod
    // this.appointment.specialty = 'cardiology';
    // this.appointment.professional.name = '1';
  }
  ngOnInit(): void {
    console.log(this.appointment);
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
    this.doctorService.getDoctors().subscribe((doctors) => {
      this.doctors = doctors;
      const specialtiesReducer = (prev, curr) => [...new Set([...prev, ...curr.specialty])];
      this.specialties = doctors.reduce(specialtiesReducer, []).map((e) => ({ label: e, value: e }));
      this.mockStepThree();
    });
  }

  filterProfessionals() {
    this.professionals = this.doctors
      .filter(({ specialty }) => specialty.includes(this.appointment.specialty))
      .map((e) => ({ label: e.name, value: e.id }));
  }
  setHours() {
    // todo refactor this code by changing the database structure
    // todo pending work, remove hours that are already taken
    this.selectedDateParsed = format('dd/MM/yyyy')(new Date(this.appointment.day));
    const dayOfWeek = this.dayOfWeekPipe.transform(getDay(new Date(this.appointment.day)));
    const dayWithHours = this.selectedDoctor.availability.filter((element) => Object.keys(element)[0] === dayOfWeek)[0];

    for (const key in dayWithHours) {
      if (Object.prototype.hasOwnProperty.call(dayWithHours, key)) {
        const element = dayWithHours[key];
        this.avaliableHours = element.map((hour) => ({ label: hour, value: hour }));
      }
    }
  }
  setProfessional() {
    this.selectedDoctor = this.doctors.filter(({ id }) => id == this.appointment.professionalId)[0];
    for (let index = 0; index < 15; index++) {
      const date = addDays(index)(new Date());
      const parsedDay = this.dayOfWeekPipe.transform(getDay(date));
      const doctorIsInTheClinic =
        this.selectedDoctor.availability.filter((element) => Object.keys(element)[0] === parsedDay).length > 0;

      if (doctorIsInTheClinic) {
        this.avaliableDays.push({ label: format('dd/MM/yyyy')(date), value: formatISO(date) });
      }
    }
  }
  mockStepThree() {
    this.appointment.specialty = 'Cardiology';
    this.appointment.professionalId = '9t65uPRjsqdTboKzHNTJPcdM8W93';
    this.activeIndex = 2;
    for (let index = 0; index < 15; index++) {
      const date = addDays(index)(new Date());
      const parsedDay = this.dayOfWeekPipe.transform(getDay(date));
      this.selectedDoctor = this.doctors.filter((doctor) => this.appointment.professionalId === doctor.id)[0];
      const doctorIsInTheClinic =
        this.selectedDoctor.availability.filter((element) => Object.keys(element)[0] === parsedDay).length > 0;

      if (doctorIsInTheClinic) {
        this.avaliableDays.push({ label: format('dd/MM/yyyy')(date), value: date });
      }
    }
  }
  nextPage() {
    this.activeIndex += 1;
    console.log(this.appointment);
    if (this.activeIndex === 3) {
      // this.appointment.day = this.appointment.day;
      // this.appointment.day = this.appointment.day;
    }
    this.submitted = true;
  }
  confirmAppointment() {
    this.appointment.status = 'Active';
    this.appointment.patientSurvey = null;
    this.appointment.doctorReview = null;

    console.log('Variable: this.appointment equals');
    console.log(this.appointment);
  }
}

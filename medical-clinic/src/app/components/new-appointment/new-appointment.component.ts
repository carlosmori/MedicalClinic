import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Appointment } from 'src/app/classes/appointment';
import { SelectItem } from 'primeng/api';
import { DoctorService } from 'src/app/services/doctor.service';
import { addDays, format, formatISO } from 'date-fns/fp';
import { DayOfWeekPipe } from 'src/app/pipes/day-of-week.pipe';
import { getDay } from 'date-fns';
import { AuthService } from 'src/app/services/auth.service';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss'],
  providers: [DayOfWeekPipe, MessageService],
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
  patient: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private dayOfWeekPipe: DayOfWeekPipe,
    private messageService: MessageService
  ) {
    this.appointment = new Appointment();
  }
  ngOnInit(): void {
    this.items = [
      {
        label: 'Specialty',
      },
      {
        label: 'Professional',
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
      // this.mockStepThree();
    });
    this.patient = this.authService.currentUser();
  }

  filterProfessionals() {
    this.professionals = this.doctors
      .filter(({ specialty }) => specialty.includes(this.appointment.professional.specialty))
      .map((doctor) => ({ label: doctor.name, value: doctor.id }));
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
    this.selectedDoctor = this.doctors.filter(({ id }) => id == this.appointment.professional.id)[0];
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
    this.appointment.professional.specialty = 'Cardiology';
    this.appointment.professional.name = 'Enrique Diaz';
    this.appointment.professional.id = '9t65uPRjsqdTboKzHNTJPcdM8W93';
    this.activeIndex = 2;
    for (let index = 0; index < 15; index++) {
      const date = addDays(index)(new Date());
      const parsedDay = this.dayOfWeekPipe.transform(getDay(date));
      this.selectedDoctor = this.doctors.filter((doctor) => this.appointment.professional.id === doctor.id)[0];
      const doctorIsInTheClinic =
        this.selectedDoctor.availability.filter((element) => Object.keys(element)[0] === parsedDay).length > 0;

      if (doctorIsInTheClinic) {
        this.avaliableDays.push({ label: format('dd/MM/yyyy')(date), value: date });
      }
    }
  }
  nextPage() {
    this.activeIndex += 1;
    this.submitted = true;
  }
  confirmAppointment() {
    this.appointment.professional.name = this.selectedDoctor.name;
    this.appointment.patient.id = this.patient.uid;
    this.appointment.patient.name = this.patient.name;
    this.appointment.patient.email = this.patient.email;
    this.appointmentService
      .createAppointment(this.appointment)
      .then((response) => {
        this.messageService.add({
          key: 'bc',
          severity: 'success',
          summary: 'Appointment created succesfully',
        });
        this.router.navigate(['home/my-appointments']);
      })
      .catch((error) => {
        this.messageService.add({
          key: 'bc',
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      });
  }
}

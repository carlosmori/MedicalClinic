import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Appointment } from 'src/app/classes/appointment';
import { SelectItem } from 'primeng/api';
import { addDays, format, formatISO } from 'date-fns/fp';
import { DayOfWeekPipe } from 'src/app/pipes/day-of-week.pipe';
import { getDay } from 'date-fns';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';
import { Profiles } from 'src/app/enums/profiles.enum';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss'],
  providers: [DayOfWeekPipe, MessageService],
})
export class NewAppointmentComponent implements OnInit {
  items: MenuItem[];
  specialties: SelectItem[];
  avaliableDays: SelectItem[] = [];
  avaliableHours: SelectItem[];

  submitted = false;
  appointment: Appointment;
  activeIndex = 0;
  professionals: any[];
  professionalName: any;
  selectedDateParsed: string;
  patient: any;
  professionalsBasedOnSpecialty: { label: any; value: any }[];
  appointmentProfessional: any;
  formattedDate: string;
  appointmentHour: any;
  appointmentDay: any;
  appointmentSpecialty: string;
  specialtiesReducer = (prev, curr) => [...new Set([...prev, ...curr.specialties])];

  constructor(
    private router: Router,
    private appointmentService: AppointmentService,
    private dayOfWeekPipe: DayOfWeekPipe,
    private messageService: MessageService,
    private userService: UserService
  ) {}

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

    this.userService.getUsersByType({ profile: Profiles.PROFESSIONAL }).subscribe((professionals) => {
      this.professionals = professionals;
      this.specialties = professionals.reduce(this.specialtiesReducer, []).map((e) => ({ label: e, value: e }));
    });
  }
  pickSpecialty(specialty: string) {
    this.appointmentSpecialty = specialty;
    this.professionalsBasedOnSpecialty = this.professionals
      .filter(({ specialties }) => specialties.includes(specialty))
      .map((professional) => ({ label: professional.name, value: professional.uid }));
    this.nextPage();
  }
  pickProfessional(professionalId: any) {
    this.appointmentProfessional = this.professionals.filter(({ uid }) => uid == professionalId)[0];
    for (let index = 0; index < 15; index++) {
      const date = addDays(index)(new Date());
      const parsedDay = this.dayOfWeekPipe.transform(getDay(date));
      const doctorIsInTheClinic =
        this.appointmentProfessional.availability.filter((element) => Object.keys(element)[0] === parsedDay).length > 0;

      if (doctorIsInTheClinic) {
        this.avaliableDays.push({ label: format('dd/MM/yyyy')(date), value: formatISO(date) });
      }
    }
    this.nextPage();
  }
  pickDay(day) {
    // todo refactor this code by changing the database structure
    // todo pending work, remove hours that are already taken
    this.appointmentDay = day;
    this.formattedDate = format('dd/MM/yyyy')(new Date(day));
    const dayOfWeek = this.dayOfWeekPipe.transform(getDay(new Date(day)));
    const dayWithHours = this.appointmentProfessional.availability.filter(
      (element) => Object.keys(element)[0] === dayOfWeek
    )[0];
    for (const key in dayWithHours) {
      if (Object.prototype.hasOwnProperty.call(dayWithHours, key)) {
        const element = dayWithHours[key];
        this.avaliableHours = element.map((hour) => ({ label: hour, value: hour }));
      }
    }
  }
  pickHour(hour) {
    this.appointmentHour = hour;
    this.nextPage();
  }

  saveAppointment(appointment) {
    this.appointmentService
      .createAppointment(appointment)
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

  nextPage() {
    this.activeIndex += 1;
    this.submitted = true;
  }

  // * Mock functions to avoid filling the forms

  mockStepOne() {
    this.pickSpecialty('Cardiology');
  }
  mockStepTwo() {
    this.pickSpecialty('Cardiology');
    this.pickProfessional('dSO9jkAplOT4U3dLdPSSiyVENwT2');
  }
  mockStepThree() {
    this.appointment.professional.specialty = 'Cardiology';
    this.appointment.professional.name = 'Enrique Diaz';
    this.appointment.professional.id = '9t65uPRjsqdTboKzHNTJPcdM8W93';
    this.activeIndex = 2;
    for (let index = 0; index < 15; index++) {
      const date = addDays(index)(new Date());
      const parsedDay = this.dayOfWeekPipe.transform(getDay(date));
      this.appointmentProfessional = this.professionals.filter(
        (doctor) => this.appointment.professional.id === doctor.id
      )[0];
      const doctorIsInTheClinic =
        this.appointmentProfessional.availability.filter((element) => Object.keys(element)[0] === parsedDay).length > 0;

      if (doctorIsInTheClinic) {
        this.avaliableDays.push({ label: format('dd/MM/yyyy')(date), value: date });
      }
    }
  }
}

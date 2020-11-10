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
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss'],
  providers: [DayOfWeekPipe, MessageService],
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
export class NewAppointmentComponent implements OnInit {
  items: MenuItem[];
  specialties: SelectItem[];
  availableDays: SelectItem[] = [];
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
  appointmentHour: any;
  appointmentDay: any;
  appointmentSpecialty: string;
  currentProfessionalAppointments: any[];
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
    this.appointmentService.getSpecialties().subscribe((specialties) => {
      this.specialties = specialties.map(({ specialty }) => ({
        label: specialty,
        value: specialty,
      }));
    });
    this.appointmentService.getDoctors().subscribe((doctors) => {
      this.professionals = doctors;
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
      const parsedDay = '' + this.dayOfWeekPipe.transform(getDay(date));
      const doctorIsInTheClinic = Object.keys(this.appointmentProfessional.availability).includes(parsedDay);
      if (doctorIsInTheClinic) {
        this.availableDays.push({
          label: `${parsedDay} - ${format('dd/MM/yyyy')(date)}`,
          value: {
            formattedDate: format('dd/MM/yyyy')(date),
            day: formatISO(date),
            hours: this.appointmentProfessional.availability[parsedDay],
          },
        });
      }
    }
    this.appointmentService
      .getActiveDoctorAppointments({ professionalId: this.appointmentProfessional.uid })
      .subscribe((appointments) => {
        this.currentProfessionalAppointments = appointments;
        // *Try this in a promise
        this.removeUnAvailableHours();
      });
    this.nextPage();
  }
  removeUnAvailableHours() {
    this.availableDays.map((currDay) => {
      this.currentProfessionalAppointments.forEach((appointment) => {
        const { day, hour } = appointment;
        const appointmentDate = format('dd/MM/yyyy')(new Date(day));
        if (currDay.value.formattedDate === appointmentDate) {
          currDay.value.hours = [...currDay.value.hours.filter((unAvailableHour) => unAvailableHour !== hour)];
        }
      });
    });
  }
  pickDay(day) {
    this.appointmentDay = day.day;
    this.avaliableHours = day.hours.map((hour) => ({ label: hour, value: hour }));
  }
  pickHour(hour) {
    this.appointmentHour = hour;
    this.nextPage();
  }

  saveAppointment(appointment) {
    this.appointmentService
      .saveAppointment(appointment, appointment.professional.uid, appointment.patient.uid)
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
        this.availableDays.push({ label: format('dd/MM/yyyy')(date), value: date });
      }
    }
  }
}

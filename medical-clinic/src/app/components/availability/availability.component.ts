import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { WeekDays } from 'src/app/enums/week-days.enum';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
  providers: [MessageService],
})
export class AvailabilityComponent implements OnInit {
  weekDays: any[];
  currentDay: string;
  hours: string[] = [];
  dayHours: SelectItem[];
  currentUser: any;
  showUpdateAvailability: boolean;
  activeIndex: number;
  doctor: any;
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private doctorService: DoctorService
  ) {
    this.activeIndex = 0;
    this.weekDays = [
      { label: 'Sunday', value: 'Sunday' },
      { label: 'Monday', value: 'Monday' },
      { label: 'Tuesday', value: 'Tuesday' },
      { label: 'Wednesday', value: 'Wednesday' },
      { label: 'Thursday', value: 'Thursday' },
      { label: 'Friday', value: 'Friday' },
      { label: 'Saturday', value: 'Saturday' },
    ];
    this.dayHours = [
      { label: '08:00', value: '08:00' },
      { label: '09:00', value: '09:00' },
      { label: '10:00', value: '10:00' },
      { label: '11:00', value: '11:00' },
      { label: '12:00', value: '12:00' },
      { label: '13:00', value: '13:00' },
      { label: '14:00', value: '14:00' },
      { label: '15:00', value: '15:00' },
      { label: '16:00', value: '16:00' },
      { label: '17:00', value: '17:00' },
      { label: '18:00', value: '18:00' },
    ];
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();
    this.doctorService
      .getDoctorById({ professionalId: this.currentUser.uid })
      .pipe(map((arr) => arr[0]))
      .subscribe((doctor) => {
        this.doctor = doctor;
        // If there is a schedule for the first day of the week [Sunday], then assign those hours
        this.hours = doctor.availability[WeekDays[0]] && [...doctor.availability['Sunday']];
      });
  }
  updateAvailability() {
    this.doctor.availability = {
      ...this.doctor.availability,
      [WeekDays[this.activeIndex]]: this.hours,
    };
    this.doctorService
      .updateDoctor({
        doctor: { ...this.doctor },
      })
      .catch((error) => {
        this.messageService.add({
          key: 'bc',
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      })
      .finally(() => {
        this.showUpdateAvailability = false;
        this.messageService.add({
          key: 'bc',
          severity: 'success',
          summary: 'The new specialty was added',
        });
      });
  }
  changeTab({ index }) {
    this.activeIndex = index;
    this.showUpdateAvailability = false;
    this.hours = this.doctor.availability[WeekDays[index]];
  }
  draftAvailability() {
    this.showUpdateAvailability = true;
  }
}

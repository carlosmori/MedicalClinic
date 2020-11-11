import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { WeekDays } from 'src/app/enums/week-days.enum';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
  providers: [ConfirmationService],
})
export class AvailabilityComponent implements OnInit {
  weekDays: any[];
  currentDay: string;
  hours: string[];
  dayHours: { label: string; value: string }[];
  currentUser: any;
  showUpdateAvailability: boolean;
  newAvailability: any;
  activeIndex: number;
  constructor(
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private userService: UserService
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
      { label: '08:00 AM', value: '08:00 AM' },
      { label: '09:00 AM', value: '09:00 AM' },
      { label: '10:00 AM', value: '10:00 AM' },
      { label: '11:00 AM', value: '11:00 AM' },
      { label: '12:00 AM', value: '12:00 AM' },
      { label: '01:00 PM', value: '01:00 PM' },
      { label: '02:00 PM', value: '02:00 PM' },
      { label: '03:00 PM', value: '03:00 PM' },
      { label: '04:00 PM', value: '04:00 PM' },
      { label: '05:00 PM', value: '05:00 PM' },
      { label: '06:00 PM', value: '06:00 PM' },
    ];
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();
  }
  displayDaySchedule() {
    console.log('Variable: this.currentDay equals');
    console.log(this.currentDay);
  }
  updateAvailability() {
    this.newAvailability = [
      {
        [WeekDays[this.activeIndex]]: this.hours,
      },
      ...this.currentUser.availability,
    ];
    this.currentUser.availability = this.newAvailability = [
      {
        [WeekDays[this.activeIndex]]: this.hours,
      },
      ...this.currentUser.availability,
    ];
    this.authService
      .updateUser({
        userId: this.currentUser.uid,
        user: { availability: this.newAvailability },
      })
      .catch((error) => {
        // this.messageService.add({
        //   key: 'bc',
        //   severity: 'error',
        //   summary: 'Error',
        //   detail: error.message,
        // });
      })
      .finally(() => {
        // this.hideDialog();
        // this.messageService.add({
        //   key: 'bc',
        //   severity: 'success',
        //   summary: 'The new specialty was added',
        // });
      });
    // this.confirmationService.confirm({
    //   message: 'Are you sure that you want to perform this action?',
    //   accept: () => {
    //     console.log('Accept');
    //     console.log('Variable: this.hour equals');
    //     console.log(this.hours);
    //     this.authService.updateUser({
    //       userId: professional.uid,
    //       user: { isProfessionalEnabled: !professional.isProfessionalEnabled },
    //     });
    //   },
    // });
  }
  changeTab({ index }) {
    console.log('Variable: weekD equals');
    this.newAvailability = [];
    this.activeIndex = index;
    console.log(WeekDays[index]);
    this.showUpdateAvailability = false;
    const dayWithHours = this.currentUser.availability.filter(
      (element) => Object.keys(element)[0] === WeekDays[index]
    )[0];
    if (dayWithHours) {
      this.hours = dayWithHours[WeekDays[index]];
    } else {
      this.hours = [];
    }
  }
  draftAvailability() {
    console.log('draft');
    this.showUpdateAvailability = true;
  }
}

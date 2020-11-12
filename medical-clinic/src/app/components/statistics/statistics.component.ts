import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { Profiles } from 'src/app/enums/profiles.enum';
import { DayPipe } from 'src/app/pipes/day.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  providers: [DayPipe],
})
export class StatisticsComponent implements OnInit {
  currentUser;
  loginStats: any;
  loginData: any;
  opeartionStats: any[];
  operationsData: any;
  weekDays: any[];
  professionals: SelectItem[];
  activeIndex: number;
  weekDaysTableActiveIndex: any = 0;
  selectedDoctor: any;
  selectedDate: any;
  doctors: { label: any; value: any }[];
  logLabels: SelectItem[];
  loginDayData: any;

  constructor(
    private authService: AuthService,
    private dayPipe: DayPipe,
    private doctorService: DoctorService,
    private statisticService: StatisticService
  ) {
    this.currentUser = authService.currentUser();
    this.doctorService.getDoctors().subscribe((doctors) => {
      this.professionals = doctors.map((doctor) => ({ label: doctor.name, value: doctor.uid }));
    });
    this.weekDays = [
      { label: 'Sunday', value: 'Sunday' },
      { label: 'Monday', value: 'Monday' },
      { label: 'Tuesday', value: 'Tuesday' },
      { label: 'Wednesday', value: 'Wednesday' },
      { label: 'Thursday', value: 'Thursday' },
      { label: 'Friday', value: 'Friday' },
      { label: 'Saturday', value: 'Saturday' },
    ];
  }
  groupBy = (items, key) =>
    items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      }),
      {}
    );
  ngOnInit(): void {
    this.activeIndex = 0;
  }

  changeTabWeekDay({ index }) {
    this.weekDaysTableActiveIndex = index;
  }
  fillDoctorCharts() {
    console.log('Variable: this.selectedDoctor equals');
    console.log(this.selectedDoctor);

    this.statisticService.getLoginStatistics({ userId: this.selectedDoctor }).subscribe((stats) => {
      this.loginStats = stats.map((stat) => ({ ...stat, parsedDate: this.dayPipe.transform(stat.dateTime) }));
      this.loginStats = this.groupBy(this.loginStats, 'parsedDate');
      this.logLabels = Object.keys(this.loginStats).map((day) => ({ label: day, value: day }));
      this.loginData = {
        labels: Object.keys(this.loginStats),
        datasets: [
          {
            label: 'Logins per Day',
            data: Object.keys(this.loginStats).map((day) => this.loginStats[day].length),
            fill: false,
            borderColor: '#4bc0c0',
            backgroundColor: '#42A5F5',
          },
        ],
      };
    });
  }
  fillDoctorDayCharts() {
    console.log('Variable: this.selectedDate equals');
    const labels = this.loginStats[this.selectedDate];
    const groupedLoginHours = this.groupBy(labels, 'hour');
    const parsedLabels = Object.keys(groupedLoginHours);

    console.log('Variable: labels equals');
    console.log(groupedLoginHours);
    this.loginDayData = {
      labels: parsedLabels,
      datasets: [
        {
          label: 'Logins per Hour',
          data: Object.keys(groupedLoginHours).map((hour) => groupedLoginHours[hour].length),
          fill: false,
          borderColor: '#4bc0c0',
          backgroundColor: '#42A5F5',
        },
      ],
    };
  }
}

// this.statisticService.getOperationStatistics({ userId: this.currentUser.uid }).subscribe((stats) => {
//   this.opeartionStats = stats.map((stat) => ({ ...stat, value: this.dayPipe.transform(stat.value) }));
//   console.log('Variable: this.operationStats equals');
//   const operationStats = this.groupBy(this.opeartionStats, 'type');
//   console.log(operationStats);

//   // this.loginData = {
//   //   labels: Object.keys(logStats),
//   //   datasets: [
//   //     {
//   //       label: 'Logins per Day',
//   //       data: Object.keys(logStats).map((day) => logStats[day].length),
//   //       fill: false,
//   //       borderColor: '#4bc0c0',
//   //       backgroundColor: '#42A5F5',
//   //     },
//   //     // {
//   //     //   label: 'Second Dataset',
//   //     //   data: [28, 48, 40, 19, 86, 27, 90],
//   //     //   fill: false,
//   //     //   borderColor: '#565656',
//   //     // },
//   //   ],
//   // };
// });

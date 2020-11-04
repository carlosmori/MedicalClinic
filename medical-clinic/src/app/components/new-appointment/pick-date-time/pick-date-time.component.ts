import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { format } from 'date-fns/fp';

@Component({
  selector: 'app-pick-date-time',
  templateUrl: './pick-date-time.component.html',
  styleUrls: ['./pick-date-time.component.scss'],
})
export class PickDateTimeComponent implements OnInit {
  @Input() avaliableDays;
  @Input() avaliableHours;
  @Output() selectedDay = new EventEmitter<any>();
  @Output() selectedHour = new EventEmitter<any>();
  day: any;
  hour: any;

  constructor() {}

  ngOnInit(): void {}
  pickDay() {
    // const formattedDay = format('dd/MM/yyyy')(new Date(this.day));
    this.selectedDay.emit(this.day);
  }
  pickHour() {
    this.selectedHour.emit(this.hour);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pick-specialty',
  templateUrl: './pick-specialty.component.html',
  styleUrls: ['./pick-specialty.component.scss'],
})
export class PickSpecialtyComponent implements OnInit {
  @Input() specialties: string;
  @Output() selectedSpecialty = new EventEmitter<string>();
  specialty: string;
  constructor() {}

  ngOnInit(): void {}
  pickSpecialty() {
    this.selectedSpecialty.emit(this.specialty);
  }
}

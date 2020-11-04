import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pick-professional',
  templateUrl: './pick-professional.component.html',
  styleUrls: ['./pick-professional.component.scss'],
})
export class PickProfessionalComponent implements OnInit {
  @Input() professionals;
  @Output() selectedProfessional = new EventEmitter<any>();
  professional: any;

  constructor() {}

  ngOnInit(): void {}

  pickProfessional() {
    this.selectedProfessional.emit(this.professional);
  }
}

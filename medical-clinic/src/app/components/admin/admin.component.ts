import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  professionals: any[] = [];
  constructor() {}

  ngOnInit(): void {}
  enableProfessional(professional) {
    console.log('Variable: professional equals');
    console.log(professional);
  }
  addSpecialty(professional) {
    console.log('Variable: professional equals');
    console.log(professional);
  }
}

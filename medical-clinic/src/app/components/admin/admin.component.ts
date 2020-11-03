import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [ConfirmationService],
})
export class AdminComponent implements OnInit {
  professionals: any[] = [{}];
  displaySpecialtyDialog = false;

  constructor(private authService: AuthService, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    // todo remove doctorsService, replace it by UserService and leave auth for authentication only
    this.authService.getUsersByType({ profile: 'Professional' }).subscribe((professionals) => {
      console.log('Variable: doctors equals');
      console.log(professionals);
      this.professionals = professionals;
    });
  }
  enableProfessional(professional) {
    console.log('Variable: professional equals');
    console.log(professional);
  }
  addSpecialty(professional) {
    console.log('Variable: professional equals');
    console.log(professional);
  }
  hideDialog() {
    // this.currentAppointment = null;
    // this.content = null;
  }
  // confirm() {
  // this.displaySpecialtyDialog = false;
  // this.appointmentService.updateAppointment({
  //   appointmentId: this.currentAppointment.appointmentId,
  //   appointment: { patientSurvey: this.patientSurvey },
  // });
  // }
  confirm(professional) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.authService.updateUser({
          userId: professional.uid,
          user: { isProfessionalEnabled: !professional.isProfessionalEnabled },
        });
      },
    });
  }
}

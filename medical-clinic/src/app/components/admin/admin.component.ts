import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';
import { Profiles } from 'src/app/enums/profiles.enum';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class AdminComponent implements OnInit {
  professionals: any[] = [{}];
  patients: any[] = [{}];
  displaySpecialtyDialog = false;
  currentProfessional: any;
  specialties: SelectItem[];
  customSpecialties: SelectItem[];
  newSpecialty: any;
  selectedSpecialty: string | null = null;

  constructor(
    private authService: AuthService,
    private doctorService: DoctorService,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe((doctors) => {
      this.professionals = doctors;
    });
    // todo implement patients table?
    // this.userService.getUsersByType({ profile: Profiles.PATIENT }).subscribe((patients) => {
    //   console.log('Variable: patients equals');
    //   console.log(patients);
    // });
    this.userService.getSpecialties().subscribe((specialties) => {
      this.specialties = specialties.map(({ specialty }) => ({ label: specialty, value: specialty, disabled: false }));
    });
  }
  openNewSpecialtyDialog(professional) {
    this.displaySpecialtyDialog = true;
    this.currentProfessional = professional;
    this.customSpecialties = this.specialties.map((specialty) => {
      if (professional.specialties.includes(specialty.value)) {
        return { ...specialty, disabled: true };
      } else {
        return { ...specialty };
      }
    });
    console.log('Variable: specialty equals');
    console.log(this.customSpecialties);
  }
  confirmNewSpecialty() {
    this.doctorService
      .updateDoctor({
        doctor: {
          ...this.currentProfessional,
          specialties: [...this.currentProfessional.specialties, this.selectedSpecialty],
        },
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
        this.hideDialog();
        this.messageService.add({
          key: 'bc',
          severity: 'success',
          summary: 'The new specialty was added',
        });
      });
  }
  hideDialog() {
    this.displaySpecialtyDialog = false;
    this.currentProfessional = null;
    this.selectedSpecialty = null;
  }
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

import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class AdminComponent implements OnInit {
  professionals: any[] = [{}];
  displaySpecialtyDialog = false;
  currentProfessional: any;
  specialties: SelectItem[];
  newSpecialty: any;
  selectedSpecialty: string | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userService.getUsersByType({ profile: 'professional' }).subscribe((professionals) => {
      this.professionals = professionals;
    });
    this.userService.getSpecialties().subscribe((specialties) => {
      this.specialties = specialties.map(({ specialty }) => ({ label: specialty, value: specialty }));
    });
  }
  openNewSpecialtyDialog(professional) {
    // todo make sure the specialties already taken by the professional are not displayed in the select
    // todo maybe a filter here based on the array of specialties?
    this.displaySpecialtyDialog = true;
    this.currentProfessional = professional;
  }
  confirmNewSpecialty() {
    this.authService
      .updateUser({
        userId: this.currentProfessional.uid,
        user: { specialty: [...this.currentProfessional.specialty, this.selectedSpecialty] },
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

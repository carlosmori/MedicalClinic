import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Profiles } from 'src/app/enums/profiles.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  items: MenuItem[];
  currentUser;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();
    // this.items = [{ label: 'My Account (WIP)', icon: 'pi pi-user' }];
    this.items = [];
    if (this.currentUser.profile === Profiles.PATIENT) {
      this.items = [
        ...this.items,
        { label: 'New Appointment', icon: 'pi pi-calendar-plus', routerLink: ['/home', 'new-appointment'] },
        { label: 'My Appointments', icon: 'pi pi-calendar', routerLink: ['/home', 'my-appointments'] },
      ];
    }
    if (this.currentUser.profile === Profiles.PROFESSIONAL) {
      this.items = [
        ...this.items,
        {
          label: 'Schedule',
          icon: 'pi pi-calendar',
          routerLink: ['/home', 'schedule'],
          disabled: !this.currentUser.isProfessionalEnabled,
        },
        {
          label: 'Avaliability',
          icon: 'pi pi-user-edit',
          routerLink: ['/home', 'avaliability'],
          disabled: !this.currentUser.isProfessionalEnabled,
        },
      ];
    }
    if (this.currentUser.profile === Profiles.ADMINISTRATOR) {
      this.items = [{ label: 'Admin', icon: 'pi pi-user-edit', routerLink: ['/home', 'admin'] }];
    }
  }
  signOut() {
    this.authService.signOut();
  }
}

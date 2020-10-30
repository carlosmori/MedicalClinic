import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
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
    if (this.currentUser.profile === 'Patient') {
      this.items = [
        ...this.items,
        { label: 'New Appointment', icon: 'pi pi-calendar-plus', routerLink: ['/home', 'new-appointment'] },
        { label: 'My Appointments', icon: 'pi pi-calendar', routerLink: ['/home', 'my-appointments'] },
      ];
    }
    if (this.currentUser.profile === 'Professional') {
      this.items = [
        ...this.items,
        { label: 'Schedule', icon: 'pi pi-calendar', routerLink: ['/home', 'schedule'] },
        { label: 'Avaliability', icon: 'pi pi-user-edit', routerLink: ['/home', 'avaliability'] },
      ];
    }
    if (this.currentUser.profile === 'administrator') {
      this.items = [{ label: 'Admin', icon: 'pi pi-user-edit', routerLink: ['/home', 'admin'] }];
    }
  }
  signOut() {
    this.authService.signOut();
  }
}

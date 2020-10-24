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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.items = [
      { label: 'New Appointment', icon: 'pi pi-calendar-plus', routerLink: ['/home', 'new-appointment'] },
      { label: 'My Appointments', icon: 'pi pi-calendar' },
      { label: 'My Account (WIP)', icon: 'pi pi-user' },
    ];
  }
  signOut() {
    this.authService.SignOut();
  }
}

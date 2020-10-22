import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  // Login Models
  email;
  password;
  // Registration Models
  name: string;
  userEmail: string;
  repeatUserEmail: string;
  userPassword: string;
  repeatUserPassword: string;
  profiles: SelectItem[];
  selectedProfile: string;
  displayRegisterForm: boolean;
  newUser: User;
  constructor(private authService: AuthService, private messageService: MessageService) {
    this.displayRegisterForm = true;
    this.profiles = [
      {
        label: 'Professional',
        value: 'Professional',
      },
      {
        label: 'Patient',
        value: 'Patient',
      },
    ];
    this.selectedProfile = 'Patient';
  }

  ngOnInit(): void {
    this.email = 'carlosmori34@gmail.com';
    this.password = 'shinra94';
    this.name = 'Carlos Mori';
    this.userPassword = 'shinra94';
    this.userEmail = 'carlosmori34@gmail.com';
  }

  switchForms() {
    this.displayRegisterForm = !this.displayRegisterForm;
  }
  signUp() {
    this.newUser = {
      name: this.name,
      email: this.userEmail,
      password: this.userPassword,
      profile: this.selectedProfile,
    };
    this.authService.SignUp(this.newUser).then(({ success, message }) => {
      if (success) {
        this.messageService.add({
          key: 'bc',
          severity: 'info',
          summary: 'Info',
          detail: 'Please check your email',
        });
        // this.switchForms();
      } else {
        this.messageService.add({
          key: 'bc',
          severity: 'error',
          summary: 'Error',
          detail: message,
        });
      }
    });
    console.log(this.newUser);
  }
  signIn() {
    this.authService.SignIn(this.email, this.password).then(({ success, message }) => {
      if (success) {
        this.messageService.add({
          key: 'bc',
          severity: 'success',
          summary: 'Welcome',
        });
        // todo redirect
      } else {
        this.messageService.add({
          key: 'bc',
          severity: 'error',
          summary: 'Error',
          detail: message,
        });
      }
    });
  }
}

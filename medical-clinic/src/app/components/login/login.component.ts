import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

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
  name;
  userEmail;
  repeatUserEmail;
  userPassword;
  repeatUserPassword;

  displayRegisterForm: boolean;
  newUser: User;
  constructor(private authService: AuthService, private messageService: MessageService) {
    this.displayRegisterForm = false;
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
    this.newUser = { name: this.name, email: this.userEmail, password: this.userPassword };
    this.authService.SignUp(this.newUser.email, this.newUser.password).then(({ success, message }) => {
      if (success) {
        this.messageService.add({
          key: 'bc',
          severity: 'info',
          summary: 'Info',
          detail: 'Please check your email',
        });
        this.switchForms();
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

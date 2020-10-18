import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // Login Models
  username;
  password;
  // Registration Models
  name;
  userEmail;
  repeatUserEmail;
  userPassword;
  repeatUserPassword;

  displayRegisterForm: boolean;
  registrationMessage: string;
  displayMessage: boolean;
  newUser: User;
  constructor() {
    this.displayRegisterForm = true;
    this.displayMessage = false;
  }

  ngOnInit(): void {}

  switchForms() {
    this.displayRegisterForm = !this.displayRegisterForm;
  }
  register() {
    // TODO uncoment this when done
    // this.displayMessage = true;
    // this.registrationMessage = 'Thanks for Registering, please check your email';
    this.newUser = { name: this.name, email: this.userEmail, password: this.userPassword };
    console.log(this.newUser);
  }
}

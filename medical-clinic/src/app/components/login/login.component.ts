import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { randomInt } from '../../utils/randomIntGenerator.js';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  public siteKey = environment.siteKey;
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
  customCaptchaAnswer: string;
  public captchaIsValid = false;
  public customCaptchaIsValid = false;
  randomInt1: any;
  randomInt2: any;
  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) {
    this.displayRegisterForm = false;
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
    this.name = 'Carlos Mori';
    this.userPassword = '123456';
    this.userEmail = 'carlosmori34@gmail.com';
    this.randomInt1 = randomInt(0, 10);
    this.randomInt2 = randomInt(0, 10);
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
      // Flag to set images on first log in
      firstTimeLogIn: true,
    };

    // Professionals need to be validated by an administrator first
    if (this.selectedProfile === 'Professional') {
      this.newUser = { ...this.newUser, isProfessionalEnabled: false };
    }
    this.authService.signUp(this.newUser).then(({ success, message }) => {
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
    this.authService.signIn(this.email, this.password).then(({ success, message, callback }) => {
      if (success) {
        this.messageService.add({
          key: 'bc',
          severity: 'success',
          summary: 'Welcome',
        });
        callback.subscribe((user) => {
          localStorage.setItem('user', JSON.stringify(user[0]));
          this.router.navigate(['/home']);
        });
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
  fillPatient() {
    this.email = 'carlosmori34@gmail.com';
    this.password = '123456';
  }
  fillProfessional() {
    this.email = 'cmori.94@gmail.com';
    this.password = '123456';
  }
  fillAdministrator() {
    this.email = 'ortopediasolidariadelsur@gmail.com';
    this.password = '123456';
  }
  showResponse(event) {
    console.log('event');
    console.log(event);
    if (event.response !== null) {
      this.captchaIsValid = true;
    }
  }
  checkAnswer() {
    this.customCaptchaIsValid = this.customCaptchaAnswer === this.randomInt1 + this.randomInt2;
    console.log(this.customCaptchaIsValid);
    // console.log(this.customCaptchaAnswer);
  }
}

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { randomInt } from '../../utils/randomIntGenerator.js';
import { Profiles } from 'src/app/enums/profiles.enum';
import { DoctorService } from 'src/app/services/doctor.service';
import { StatisticService } from 'src/app/services/statistic.service';
import { StatisticTypes } from 'src/app/enums/statistic-types.enum';
import { formatISO } from 'date-fns/fp';

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
  public captchaIsValid = true;
  public customCaptchaIsValid = true;
  randomInt1: any;
  randomInt2: any;
  displayCaptchas: boolean;
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private doctorService: DoctorService,
    private statisticService: StatisticService
  ) {
    this.displayRegisterForm = false;
    this.profiles = [
      {
        label: 'Patient',
        value: Profiles.PATIENT,
      },
      {
        label: 'Professional',
        value: Profiles.PROFESSIONAL,
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
      // *Flag to set images on first log in
      firstTimeLogIn: true,
    };

    if (this.selectedProfile === Profiles.PROFESSIONAL) {
      this.newUser = { ...this.newUser, isProfessionalEnabled: false };
    }
    this.authService.signUp(this.newUser).then(({ success, message, uid }) => {
      if (success) {
        this.messageService.add({
          key: 'bc',
          severity: 'info',
          summary: 'Info',
          detail: 'Please check your email',
        });
        this.doctorService
          .addDoctor({ doctor: { ...this.newUser, uid, specialties: [] } })
          .then(() => {
            this.switchForms();
          })
          .catch((error) => {
            this.messageService.add({
              key: 'bc',
              severity: 'error',
              summary: 'Error',
              detail: error.message,
            });
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
        this.statisticService.logLogInStatistic({
          statistic: {
            value: formatISO(new Date()),
            uid: this.authService.currentUser().uid,
          },
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
    if (event.response !== null) {
      this.captchaIsValid = true;
    }
  }
  checkAnswer() {
    this.customCaptchaIsValid = this.customCaptchaAnswer === this.randomInt1 + this.randomInt2;
  }
  onChangeDisplayCaptchas() {
    this.customCaptchaIsValid = !this.customCaptchaIsValid;
    this.captchaIsValid = !this.captchaIsValid;
  }
}

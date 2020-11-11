import { Component, OnChanges, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { NavigationEnd, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Profiles } from 'src/app/enums/profiles.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  [x: string]: boolean;
  currentUser: any;
  displayImageDialog: any;
  isProfessionalEnabled: any;

  constructor(
    private authService: AuthService,
    private storage: AngularFireStorage,
    private messageService: MessageService,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.displayHomeDashBoard = event.url === '/home';
      }
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();
    this.displayImageDialog = this.currentUser.firstTimeLogin;
    this.isProfessionalEnabled = this.currentUser.isProfessionalEnabled;
    // todo check this hack
    setTimeout(() => {
      if (this.currentUser.profile === Profiles.PROFESSIONAL && !this.isProfessionalEnabled) {
        this.messageService.add({
          key: 'bc',
          severity: 'error',
          summary: 'Error',
          detail: 'Please wait until the Administrator enables you to operate',
        });
      }
    }, 1000);
  }
  myUploader(event) {
    const promises = [];
    event.files.forEach((file) => {
      promises.push(
        this.storage.upload(`${file.name} - ${new Date().getTime()}`, file, { customMetadata: { blah: 'blah' } })
      );
    });
    Promise.all(promises)
      .then((response) => {
        this.messageService.add({
          key: 'bc',
          severity: 'success',
          summary: 'Great!',
          detail: 'Thanks for uploading a profile picture! ',
        });
      })
      .catch((error) => {
        this.messageService.add({
          key: 'bc',
          severity: 'error',
          summary: 'Error',
          detail: 'There as an error uploading the image, try again later',
        });
      })
      .finally(() => {
        this.authService
          .updateUser({ userId: this.currentUser.uid, user: { firstTimeLogIn: false } })
          .then((res) => {
            this.displayImageDialog = false;
          })
          .catch((errror) => {
            this.messageService.add({
              key: 'bc',
              severity: 'error',
              summary: 'Error',
              detail: 'There as an error uploading the image, try again later',
            });
          });
      });
  }
}

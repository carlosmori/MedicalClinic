import { Component, OnChanges, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Profiles } from 'src/app/enums/profiles.enum';
import { StatisticTypes } from 'src/app/enums/statistic-types.enum';
import { AuthService } from 'src/app/services/auth.service';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  public currentUser: any;
  displayImageDialog: any;
  isProfessionalEnabled: any;
  displayHomeDashBoard: boolean;

  constructor(
    private authService: AuthService,
    private storage: AngularFireStorage,
    private messageService: MessageService,
    private router: Router,
    private statisticService: StatisticService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.displayHomeDashBoard = event.url === '/home';
      }
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }
      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();
    this.displayImageDialog = this.currentUser.firstTimeLogIn;
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
  public get profileTypes(): typeof Profiles {
    return Profiles;
  }
}

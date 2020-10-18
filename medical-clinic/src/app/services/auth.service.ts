import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {}

  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
      up and returns promise */
        this.SendVerificationMail(email);
        // this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  SendVerificationMail(email) {
    // TODO continue checking https://firebase.google.com/docs/auth/web/email-link-auth?hl=es
    return this.afAuth
      .sendSignInLinkToEmail(email, null)
      .then(function () {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email);
      })
      .catch(function (error) {
        // Some error occurred, you can inspect the code: error.code
      });
  }
  // SignIn(email, password) {
  //   return this.afAuth
  //     .signInWithEmailAndPassword(email, password)
  //     .then(() => {
  //       this.ngZone.run(() => {
  //         this.afAuth.currentUser.then((result) => {
  //           const { uid, displayName, photoURL, email } = result;
  //           this.userData = {
  //             uid,
  //             displayName,
  //             photoURL,
  //             email
  //           };
  //           this.isLoggedIn = true;
  //           localStorage.setItem('user', JSON.stringify(this.userData));
  //           this.router.navigate(['/Principal']);
  //         });
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       console.log('Error in Login login');
  //     });
  // }
  Logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}

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

  
  SignIn(email, password) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.ngZone.run(() => {
          this.afAuth.currentUser.then((result) => {
            const { uid, displayName, photoURL, email } = result;
            this.userData = {
              uid,
              displayName,
              photoURL,
              email
            };
            this.isLoggedIn = true;
            localStorage.setItem('user', JSON.stringify(this.userData));
            this.router.navigate(['/Principal']);
          });
        });
      })
      .catch((error) => {
        console.log(error);
        console.log('Error in Login login');
      });
  }
  Logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/Login']);
  }
}

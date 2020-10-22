import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
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

  async SignIn(email, password) {
    const response = { success: false, message: null };
    try {
      const {
        user: { uid, emailVerified, displayName, photoURL, email: userEmail },
      } = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (!emailVerified) {
        this.SendVerificationMail();
        return { ...response, message: 'Please verify the provided email' };
      } else {
        return { ...response, success: true };
      }
    } catch ({ message }) {
      return { ...response, message };
    }
  }

  async SignUp(email: string, password: string) {
    const response = { success: false, message: null };
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.SendVerificationMail();
      return { ...response, success: true };
    } catch ({ message }) {
      return { ...response, message };
    }
  }
  async SendVerificationMail() {
    (await this.afAuth.currentUser).sendEmailVerification();
  }

  SignOut() {
    localStorage.removeItem('user');
    // this.router.navigate(['/']);
  }
}

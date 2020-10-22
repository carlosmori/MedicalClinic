import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usersCollection: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.usersCollection = this.afs.collection<any>('users');
  }

  async SignIn(email, password) {
    const response = { success: false, message: null, callback: null };
    try {
      const {
        user: { uid, emailVerified, displayName, photoURL, email: userEmail },
      } = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (!emailVerified) {
        this.SendVerificationMail();
        return { ...response, message: 'Please verify the provided email' };
      } else {
        const cb = this.afs
          .collection<any>('users', (ref) => ref.where('uid', '==', uid))
          .valueChanges();
        return { ...response, success: true, callback: cb };
      }
    } catch ({ message }) {
      return { ...response, message };
    }
  }

  async SignUp({ email, password, name, profile }: User) {
    const response = { success: false, message: null };
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.SendVerificationMail();
      await this.usersCollection.add({
        uid: user.uid,
        name,
        profile,
        email,
      });

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
    this.router.navigate(['/']);
  }
}

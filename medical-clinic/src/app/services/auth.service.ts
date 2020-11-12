import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { formatISO } from 'date-fns/fp';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usersCollection: any;
  appointmentCollection: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.usersCollection = this.afs.collection<any>('users');
    this.appointmentCollection = this.afs.collection<any>('appointments');
  }

  getAppointmentByDate({ date }) {
    const appointmentRef = this.afs.collection<any>('appointments', (ref) =>
      ref.where('day', '>', formatISO(new Date()))
    );
    return appointmentRef.valueChanges({ idField: 'appointmentId' });
  }

  async signIn(email, password) {
    const response = { success: false, message: null, callback: null, user: null };
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      const { uid, emailVerified, displayName, photoURL, email: userEmail } = user;

      if (!emailVerified) {
        this.sendVerificationMail();
        return { ...response, message: 'Please verify the provided email' };
      } else {
        const cb = this.afs
          .collection<any>('users', (ref) => ref.where('uid', '==', uid))
          .valueChanges();
        return { ...response, success: true, callback: cb, user };
      }
    } catch ({ message }) {
      return { ...response, message };
    }
  }

  async signUp({ email, password, name, profile, firstTimeLogIn, isProfessionalEnabled = null }: User) {
    const response = { success: false, message: null, uid: null };
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);

      await this.sendVerificationMail();
      await this.usersCollection.doc(user.uid).set(
        {
          uid: user.uid,
          name,
          profile,
          email,
          firstTimeLogIn,
          isProfessionalEnabled,
        },
        { merge: true }
      );

      return { ...response, success: true, uid: user.uid };
    } catch ({ message }) {
      return { ...response, message };
    }
  }
  async sendVerificationMail() {
    (await this.afAuth.currentUser).sendEmailVerification();
  }

  signOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  currentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  updateUser({ userId, user }) {
    return this.afs
      .collection('users')
      .doc(userId)
      .set({ ...user }, { merge: true });
  }
  getUsersByType({ profile }) {
    const gameRef = this.afs.collection<any>('users', (ref) =>
      ref.where('profile', '==', profile).orderBy('name', 'desc')
    );
    return gameRef.valueChanges();
  }
}

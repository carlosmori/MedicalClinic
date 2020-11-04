import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afs: AngularFirestore) {}

  getUsersByType({ profile }) {
    const gameRef = this.afs.collection<any>('users', (ref) =>
      ref.where('profile', '==', profile).orderBy('name', 'desc')
    );
    return gameRef.valueChanges();
  }

  getSpecialties() {
    const gameRef = this.afs.collection<any>('users', (ref) => ref.orderBy('specialty', 'desc'));
    return gameRef.valueChanges();
  }
}

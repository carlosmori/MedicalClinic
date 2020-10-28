import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private afs: AngularFirestore) {}

  getDoctors() {
    const gameRef = this.afs.collection<any>('doctors', (ref) => ref.orderBy('name', 'desc'));
    return gameRef.valueChanges();
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private afs: AngularFirestore) {}
  addDoctor({ doctor }) {
    return this.afs
      .collection('doctors')
      .doc(doctor.uid)
      .set({ ...doctor });
  }
  getDoctorById({ professionalId }) {
    const gameRef = this.afs.collection<any>('doctors', (ref) =>
      ref.where('uid', '==', professionalId).orderBy('name', 'desc')
    );
    return gameRef.valueChanges();
  }

  getDoctors() {
    const gameRef = this.afs.collection<any>('doctors', (ref) => ref.orderBy('name', 'desc'));
    return gameRef.valueChanges();
  }

  updateDoctor({ doctor }) {
    return this.afs
      .collection('doctors')
      .doc(doctor.uid)
      .set({ ...doctor }, { merge: true });
  }
}

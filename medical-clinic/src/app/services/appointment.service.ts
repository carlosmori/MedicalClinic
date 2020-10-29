import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private afs: AngularFirestore) {}

  createAppointment(appointment) {
    return this.afs.collection('appointments').add({ ...appointment });
  }
}

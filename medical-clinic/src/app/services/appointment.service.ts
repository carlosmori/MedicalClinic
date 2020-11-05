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
  getPatientAppointments({ patientId }) {
    const gameRef = this.afs.collection<any>('appointments', (ref) => ref.where('patient.id', '==', patientId));
    return gameRef.valueChanges({ idField: 'appointmentId' });
  }
  getDoctorAppointments({ professionalId }) {
    const gameRef = this.afs.collection<any>('appointments', (ref) =>
      ref.where('professional.uid', '==', professionalId)
    );
    return gameRef.valueChanges({ idField: 'appointmentId' });
  }
  updateAppointment({ appointmentId, appointment }) {
    return this.afs
      .collection('appointments')
      .doc(appointmentId)
      .set({ ...appointment }, { merge: true });
  }
}

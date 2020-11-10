import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private afs: AngularFirestore) {}
  saveAppointment(appointment, professionalId, patientId) {
    debugger;
    const promises = [];
    promises.push(this.afs.collection('appointments').add({ ...appointment }));
    promises.push(this.afs.collection(`appointments-doctor-${professionalId}`).add({ ...appointment }));
    promises.push(this.afs.collection(`appointments-patient-${patientId}`).add({ ...appointment }));
    return Promise.all(promises);
  }
  getPatientAppointments({ patientId }) {
    const gameRef = this.afs.collection<any>('appointments', (ref) => ref.where('patient.uid', '==', patientId));
    return gameRef.valueChanges({ idField: 'appointmentId' });
  }

  getDoctorAppointments({ professionalId }) {
    const gameRef = this.afs.collection<any>(`appointments-doctor-${professionalId}`);
    return gameRef.valueChanges();
  }

  getActiveDoctorAppointments({ professionalId }) {
    const gameRef = this.afs.collection<any>(`appointments-doctor-${professionalId}`, (ref) =>
      ref.where('status', '==', 'Active')
    );
    return gameRef.valueChanges({ idField: 'appointmentId' });
  }

  // !Deprecated
  // getDoctorAppointments({ professionalId }) {
  //   const gameRef = this.afs.collection<any>('appointments', (ref) =>
  //     ref.where('professional.uid', '==', professionalId)
  //   );
  //   return gameRef.valueChanges({ idField: 'appointmentId' });
  // }

  getSpecialties() {
    const gameRef = this.afs.collection<any>('specialties', (ref) => ref.orderBy('specialty', 'asc'));
    return gameRef.valueChanges();
  }

  getDoctors() {
    const gameRef = this.afs.collection<any>('doctors', (ref) => ref.orderBy('name', 'asc'));
    return gameRef.valueChanges();
  }

  updateAppointment({ appointmentId, appointment }) {
    return this.afs
      .collection('appointments')
      .doc(appointmentId)
      .set({ ...appointment }, { merge: true });
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private afs: AngularFirestore) {}
  saveAppointment(appointment, professionalId, patientId) {
    const promises = [];
    promises.push(
      this.afs
        .collection('appointments')
        .doc(appointment.uid)
        .set({ ...appointment })
    );
    promises.push(
      this.afs
        .collection(`appointments-doctor-${professionalId}`)
        .doc(appointment.uid)
        .set({ ...appointment })
    );
    promises.push(
      this.afs
        .collection(`appointments-patient-${patientId}`)
        .doc(appointment.uid)
        .set({ ...appointment })
    );
    return Promise.all(promises);
  }
  getPatientAppointments({ patientId }) {
    const gameRef = this.afs.collection<any>('appointments', (ref) =>
      ref.where('patient.uid', '==', patientId).orderBy('day', 'asc').orderBy('status', 'asc')
    );
    return gameRef.valueChanges({ idField: 'appointmentId' });
  }

  getDoctorAppointments({ professionalId }) {
    const gameRef = this.afs.collection<any>(`appointments-doctor-${professionalId}`, (ref) =>
      ref.orderBy('day', 'asc').orderBy('hour', 'asc')
    );
    return gameRef.valueChanges();
  }
  getAppointments() {
    const gameRef = this.afs.collection<any>('appointments');
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

  updateAppointment({ appointment, professionalId, patientId }) {
    const promises = [];
    promises.push(
      this.afs
        .collection('appointments')
        .doc(appointment.uid)
        .set({ ...appointment }, { merge: true })
    );
    promises.push(
      this.afs
        .collection(`appointments-doctor-${professionalId}`)
        .doc(appointment.uid)
        .set({ ...appointment }, { merge: true })
    );
    promises.push(
      this.afs
        .collection(`appointments-patient-${patientId}`)
        .doc(appointment.uid)
        .set({ ...appointment }, { merge: true })
    );
    return Promise.all(promises);
  }
}

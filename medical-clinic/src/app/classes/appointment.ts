import { Patient } from './patient';
import { Professional } from './professional';

export class Appointment {
  specialty: string;
  professional: Professional;
  dateTime: string;
  patient: Patient;
  status: string;
  construtor(specialty?: string, professional?: Professional, dateTime?: string, patient?: Patient) {
    this.specialty = specialty;
    this.professional = professional;
    this.dateTime = dateTime;
    this.patient = patient;
    this.status = 'Active';
  }
  updateAppointment(status) {
    this.status = status;
  }
}

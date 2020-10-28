import { Patient } from './patient';
import { Professional } from './professional';

export class Appointment {
  specialty: string;
  professionalId: string;
  professional: Professional;
  day: string;
  hour: string;
  patient: Patient;
  status: string;
  patientSurvey: string;
  doctorReview: string;
  construtor(specialty?: string, professionalId?: string, dateTime?: string, patient?: Patient) {}

  updateAppointment(status) {
    this.status = status;
  }
}

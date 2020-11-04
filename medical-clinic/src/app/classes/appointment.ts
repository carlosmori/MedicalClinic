export class Appointment {
  status: string;
  professional;
  patient;
  day: string;
  hour: string;
  patientSurvey: string;
  doctorReview: string;
  constructor(
    status = 'Active',
    professional = { uid: '', name: '', specialty: '' },
    patient = { uid: '', name: '', email: '' },
    day = '',
    hour = '',
    patientSurvey = null,
    doctorReview = null
  ) {
    this.status = status;
    this.professional = professional;
    this.patient = patient;
    this.day = day;
    this.hour = hour;
    this.patientSurvey = patientSurvey;
    this.doctorReview = doctorReview;
  }

  updateAppointment(status) {
    this.status = status;
  }
}

const { addDays, format, formatISO, getDay, isTuesday } = require('date-fns/fp');

const appointments = [
  {
    doctorSummary: null,
    status: 'Active',
    patient: { name: 'Carlos Mori', email: 'carlosmori3@gmail.com', id: 'czqnyBHqRAgXWlQ4eifmx8jQK3J2' },
    professional: { name: 'Enrique Diaz', id: '9t65uPRjsqdTboKzHNTJPcdM8W93', specialty: 'Traumato' },
    day: '2020-10-30T15:22:39-03:00',
    hour: '08:00 AM',
    patientSurvey: null,
    appointmentId: '1',
  },
  {
    day: '2020-10-29T15:22:39-03:00',
    professional: { id: '9t65uPRjsqdTboKzHNTJPcdM8W93', name: 'Enrique Diaz', specialty: 'Traumato' },
    doctorSummary: 'He is a good and nice doctor!',
    patientSurvey: null,
    patient: { id: 'czqnyBHqRAgXWlQ4eifmx8jQK3J2', email: 'carlosmori3@gmail.com', name: 'Carlos Mori' },
    status: 'Pending Dr Summary',
    hour: '08:00 AM',
    appointmentId: '2',
  },
  {
    patient: { email: 'carlosmori3@gmail.com', id: 'czqnyBHqRAgXWlQ4eifmx8jQK3J2', name: 'Carlos Mori' },
    professional: { name: 'Enrique Diaz', id: '9t65uPRjsqdTboKzHNTJPcdM8W93', specialty: 'Traumato' },
    doctorSummary: null,
    patientSurvey: null,
    day: '2020-10-30T15:22:39-03:00',
    hour: '10:00 AM',
    status: 'Active',
    appointmentId: '5',
  },
  {
    doctorSummary: null,
    professional: { name: 'Enrique Diaz', specialty: 'Traumato', id: '9t65uPRjsqdTboKzHNTJPcdM8W93' },
    day: '2020-10-30T15:22:39-03:00',
    hour: '11:00 AM',
    patient: { email: 'carlosmori3@gmail.com', id: 'czqnyBHqRAgXWlQ4eifmx8jQK3J2', name: 'Carlos Mori' },
    patientSurvey: null,
    status: 'Active',
    appointmentId: '6',
  },
  {
    hour: '09:00 AM',
    doctorSummary: null,
    patient: { id: 'czqnyBHqRAgXWlQ4eifmx8jQK3J2', name: 'Carlos Mori', email: 'carlosmori3@gmail.com' },
    professional: { name: 'Enrique Diaz', id: '9t65uPRjsqdTboKzHNTJPcdM8W93', specialty: 'Traumato' },
    day: '2020-10-31T15:22:39-03:00',
    status: 'Active',
    patientSurvey: null,
    appointmentId: '7',
  },
];
const dateIso = formatISO(new Date());
const todayAppointments = appointments.filter((appointment) => appointment.day < dateIso);
const date = format('dd/MM/yyyy')(new Date());
// const date = format('dd/MM/yyyy')(addDays(1)(new Date()));
// const dateIso = formatISO(new Date());
const dateIso2 = formatISO(addDays(2)(new Date()));

console.log(todayAppointments);
// console.log);

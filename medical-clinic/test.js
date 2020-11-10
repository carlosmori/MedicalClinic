const { addDays, format, formatISO, getDay, isTuesday } = require('date-fns/fp');
const availDays = [
  {
    label: 'Friday - 13/11/2020',
    value: {
      formattedDate: '13/11/2020',
      day: '2020-11-13T14:58:24-03:00',
      hours: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    },
  },
  {
    label: 'Monday - 16/11/2020',
    value: {
      formattedDate: '16/11/2020',
      day: '2020-11-16T14:58:24-03:00',
      hours: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    },
  },
  {
    label: 'Friday - 20/11/2020',
    value: {
      formattedDate: '20/11/2020',
      day: '2020-11-20T14:58:24-03:00',
      hours: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    },
  },
  {
    label: 'Monday - 23/11/2020',
    value: {
      formattedDate: '23/11/2020',
      day: '2020-11-23T14:58:24-03:00',
      hours: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    },
  },
];

const currApp = [
  {
    status: 'Active',
    patient: { email: 'carlosmori3@gmail.com', uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3', name: 'Carlos Mori' },
    patientSurvey: null,
    hour: '08:00',
    doctorSummary: null,
    day: '2020-11-13T14:18:14-03:00',
    professional: { specialty: 'Traumato', uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2', name: 'Enrique Diaz' },
    appointmentId: '1',
  },
  {
    patient: { name: 'Carlos Mori', uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3', email: 'carlosmori3@gmail.com' },
    hour: '09:00',
    professional: { name: 'Enrique Diaz', uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2', specialty: 'Traumato' },
    status: 'Closed',
    day: '2020-11-10T14:18:14-03:00',
    doctorSummary: 'He is a good and nice doctor!',
    patientSurvey: null,
    appointmentId: '2',
  },
  {
    hour: '09:00',
    patientSurvey: null,
    patient: { email: 'carlosmori3@gmail.com', name: 'Carlos Mori', uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3' },
    day: '2020-11-12T14:18:14-03:00',
    doctorSummary: null,
    professional: { name: 'Enrique Diaz', specialty: 'Traumato', uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2' },
    status: 'Cancelled',
    appointmentId: '3',
  },
  {
    day: '2020-11-10T14:18:14-03:00',
    patientSurvey: 'He is a nice doctor!',
    professional: { uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2', name: 'Enrique Diaz', specialty: 'Traumato' },
    patient: { uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3', email: 'carlosmori3@gmail.com', name: 'Carlos Mori' },
    doctorSummary: 'He is a good patient!',
    status: 'Closed',
    hour: '10:00',
    appointmentId: '4',
  },
  {
    patientSurvey: null,
    day: '2020-11-11T14:18:14-03:00',
    professional: { name: 'Enrique Diaz', uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2', specialty: 'Traumato' },
    hour: '10:00',
    doctorSummary: null,
    patient: { email: 'carlosmori3@gmail.com', uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3', name: 'Carlos Mori' },
    status: 'Active',
    appointmentId: '5',
  },
  {
    hour: '11:00',
    patientSurvey: null,
    professional: { uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2', name: 'Enrique Diaz', specialty: 'Traumato' },
    status: 'Active',
    patient: { uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3', name: 'Carlos Mori', email: 'carlosmori3@gmail.com' },
    doctorSummary: null,
    day: '2020-11-11T14:18:14-03:00',
    appointmentId: '6',
  },
  {
    hour: '09:00',
    professional: { name: 'Enrique Diaz', uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2', specialty: 'Traumato' },
    status: 'Active',
    patient: { name: 'Carlos Mori', uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3', email: 'carlosmori3@gmail.com' },
    doctorSummary: null,
    patientSurvey: null,
    day: '2020-11-12T14:18:14-03:00',
    appointmentId: '7',
  },
  {
    hour: '10:00',
    doctorSummary: null,
    patient: { name: 'Carlos Mori', uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3', email: 'carlosmori3@gmail.com' },
    status: 'Active',
    day: '2020-11-10T14:18:14-03:00',
    professional: { specialty: 'Traumato', name: 'Enrique Diaz', uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2' },
    patientSurvey: null,
    appointmentId: '8',
  },
  {
    status: 'Closed',
    professional: { name: 'Enrique Diaz', specialty: 'Traumato', uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2' },
    patient: { email: 'carlosmori3@gmail.com', uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3', name: 'Carlos Mori' },
    patientSurvey: 'I had a really good time',
    doctorSummary: 'A good patient!',
    day: '2020-11-10T14:18:14-03:00',
    hour: '08:00',
    appointmentId: '9',
  },
];

availDays.map((currDay) => {
  currApp.map(({ day, hour }) => {
    const appointmentDate = format('dd/MM/yyyy')(new Date(day));
    if (currDay.value.formattedDate === appointmentDate) {
      currDay.value.hours = [...currDay.value.hours.filter((unAvailableHour) => unAvailableHour !== hour)];
    }
  });
});
console.log(availDays[0]);

//const dateIso = formatISO(new Date());
//const todayAppointments = appointments.filter((appointment) => appointment.day < dateIso);
// const date = format('dd/MM/yyyy')(addDays(1)(new Date()));
// const dateIso = formatISO(new Date());
//const dateIso2 = formatISO(addDays(2)(new Date()));

//console.log(todayAppointments);
// console.log);

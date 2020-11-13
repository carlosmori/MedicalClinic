const admin = require('firebase-admin');
// serviceAccountKey.json can be generated in Firebase Console.
const serviceAccountKey = require('./admin-sdk.json');
const seed = require('firestore-seed');
const { addDays, formatISO, subDays, getHours, getMinutes } = require('date-fns/fp');
let availiability = {};
// Initialize firebase-admin.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: 'https://medical-clinic-c44ab.firebaseio.com',
  storageBucket: 'medical-clinic-c44ab.appspot.com',
});

// Import seeds.
let usersCollection = seed.collection('users', [
  seed.doc('ub8Ln1Xlf4PnBreBXpVjJE42R4I3', {
    email: 'carlosmori34@gmail.com',
    firstTimeLogin: false,
    isProfessionalEnabled: null,
    name: 'Carlos Mori',
    profile: 'patient',
    uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
  }),
  seed.doc('cFGHEE0OQQTiHQKGjz2OtcMh4gZ2', {
    email: 'cmori.94@gmail.com',
    firstTimeLogin: false,
    isProfessionalEnabled: true,
    name: 'Enrique Diaz',
    profile: 'professional',
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('03Sf8Gd5nGTKpDSh0mbqYIdJlpY2', {
    email: 'ortopediasolidariadelsur@gmail.com',
    firstTimeLogin: false,
    isProfessionalEnabled: null,
    name: 'Admin',
    profile: 'administrator',
    uid: '03Sf8Gd5nGTKpDSh0mbqYIdJlpY2',
  }),
]);
usersCollection
  .importDocuments(admin)
  .then(() => {
    console.log('Successfully imported documents.');
  })
  .catch((e) => {
    console.log('Failed to import documents: ' + e);
  });

let doctorsCollection = seed.collection('doctors', [
  seed.doc('cFGHEE0OQQTiHQKGjz2OtcMh4gZ2', {
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
    name: 'Enrique Diaz',
    isProfessionalEnabled: true,
    availability: {
      ['Monday']: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      ['Friday']: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    },
    specialties: ['Cardiology', 'Traumato'],
  }),
  seed.doc('2', {
    uid: '2',
    name: 'Megan Diaz',
    specialties: ['Pediathry'],
    isProfessionalEnabled: true,
    availability: {
      ['Monday']: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    },
  }),
]);

doctorsCollection
  .importDocuments(admin)
  .then(() => {
    console.log('Successfully imported documents.');
  })
  .catch((e) => {
    console.log('Failed to import documents: ' + e);
  });

let specialtiesCollection = seed.collection('specialties', [
  seed.doc('1', { specialty: 'Cardiology' }),
  seed.doc('2', { specialty: 'Pediathry' }),
  seed.doc('3', { specialty: 'Traumato' }),
]);
specialtiesCollection
  .importDocuments(admin)
  .then(() => {
    console.log('Successfully imported documents.');
  })
  .catch((e) => {
    console.log('Failed to import documents: ' + e);
  });

let appointmentsCollection = seed.collection('appointments', [
  seed.doc('1', {
    uid: '1',
    status: 'Active',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(3)(new Date())),
    hour: '08:00',
    patientSurvey: null,
    doctorSummary: null,
  }),
  seed.doc('2', {
    uid: '2',
    status: 'Closed',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(new Date()),
    hour: '09:00',
    patientSurvey: null,
    doctorSummary: 'He is a good and nice doctor!',
  }),
  seed.doc('3', {
    uid: '3',
    status: 'Cancelled',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(2)(new Date())),
    hour: '09:00',
    patientSurvey: null,
    doctorSummary: null,
  }),
  seed.doc('4', {
    uid: '4',
    status: 'Closed',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(new Date()),
    hour: '10:00',
    patientSurvey: 'He is a nice doctor!',
    doctorSummary: 'He is a good patient!',
  }),
  seed.doc('5', {
    uid: '5',
    status: 'Active',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(1)(new Date())),
    hour: '10:00',
    patientSurvey: null,
    doctorSummary: null,
  }),
  seed.doc('6', {
    uid: '6',
    status: 'Active',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(1)(new Date())),
    hour: '11:00',
    patientSurvey: null,
    doctorSummary: null,
  }),
  seed.doc('7', {
    uid: '7',
    status: 'Active',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(2)(new Date())),
    hour: '09:00',
    patientSurvey: null,
    doctorSummary: null,
  }),
  seed.doc('8', {
    uid: '8',
    status: 'Active',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(new Date()),
    hour: '10:00',
    patientSurvey: null,
    doctorSummary: null,
  }),
  seed.doc('9', {
    uid: '9',
    status: 'Closed',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(new Date()),
    hour: '08:00',
    patientSurvey: 'I had a really good time',
    doctorSummary: 'A good patient!',
  }),
]);

appointmentsCollection
  .importDocuments(admin)
  .then(() => {
    console.log('Successfully imported documents.');
  })
  .catch((e) => {
    console.log('Failed to import documents: ' + e);
  });
// appointments-doctor-{id}
let doctorAppointments = seed.collection('appointments-doctor-cFGHEE0OQQTiHQKGjz2OtcMh4gZ2', [
  seed.doc('1', {
    uid: '1',
    status: 'Active',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(3)(new Date())),
    hour: '08:00',
    patientSurvey: null,
    doctorSummary: null,
  }),
  seed.doc('2', {
    uid: '2',
    status: 'Closed',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(new Date()),
    hour: '09:00',
    patientSurvey: null,
    doctorSummary: 'He is a good and nice doctor!',
  }),
  seed.doc('3', {
    uid: '3',
    status: 'Cancelled',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(2)(new Date())),
    hour: '09:00',
    patientSurvey: null,
    doctorSummary: null,
  }),
  seed.doc('4', {
    uid: '4',
    status: 'Closed',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(new Date()),
    hour: '10:00',
    patientSurvey: 'He is a nice doctor!',
    doctorSummary: 'He is a good patient!',
  }),
  seed.doc('5', {
    uid: '5',
    status: 'Active',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(1)(new Date())),
    hour: '10:00',
    patientSurvey: null,
    doctorSummary: null,
  }),
  seed.doc('6', {
    uid: '6',
    status: 'Active',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(1)(new Date())),
    hour: '11:00',
    patientSurvey: null,
    doctorSummary: null,
  }),
  seed.doc('7', {
    uid: '7',
    status: 'Active',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(2)(new Date())),
    hour: '09:00',
    patientSurvey: null,
    doctorSummary: null,
  }),
  seed.doc('8', {
    uid: '8',
    status: 'Active',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(new Date()),
    // day: format('dd/MM/yyyy')(addDays(1)(new Date())),
    hour: '10:00',
    patientSurvey: null,
    doctorSummary: null,
  }),
  seed.doc('9', {
    uid: '9',
    status: 'Closed',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(new Date()),
    hour: '08:00',
    patientSurvey: 'I had a really good time',
    doctorSummary: 'A good patient!',
  }),
]);
doctorAppointments
  .importDocuments(admin)
  .then(() => {
    console.log('Successfully imported documents.');
  })
  .catch((e) => {
    console.log('Failed to import documents: ' + e);
  });
let patientAppointments = seed.collection('appointments-patient-ub8Ln1Xlf4PnBreBXpVjJE42R4I3', [
  seed.doc('1', {
    uid: '1',
    status: 'Active',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(3)(new Date())),
    hour: '08:00',
    patientSurvey: null,
    doctorSummary: null,
  }),
  seed.doc('2', {
    uid: '2',
    status: 'Closed',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(new Date()),
    hour: '09:00',
    patientSurvey: null,
    doctorSummary: 'He is a good and nice doctor!',
  }),
  seed.doc('3', {
    uid: '3',
    status: 'Cancelled',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(2)(new Date())),
    hour: '09:00',
    patientSurvey: null,
    doctorSummary: null,
  }),
  seed.doc('4', {
    uid: '4',
    status: 'Closed',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(new Date()),
    hour: '10:00',
    patientSurvey: 'He is a nice doctor!',
    doctorSummary: 'He is a good patient!',
  }),
  seed.doc('5', {
    uid: '5',
    status: 'Active',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(1)(new Date())),
    hour: '10:00',
    patientSurvey: null,
    doctorSummary: null,
  }),
  seed.doc('6', {
    uid: '6',
    status: 'Active',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(1)(new Date())),
    hour: '11:00',
    patientSurvey: null,
    doctorSummary: null,
  }),
  seed.doc('7', {
    uid: '7',
    status: 'Active',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(2)(new Date())),
    hour: '09:00',
    patientSurvey: null,
    doctorSummary: null,
  }),
  seed.doc('8', {
    uid: '8',
    status: 'Active',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(new Date()),
    // day: format('dd/MM/yyyy')(addDays(1)(new Date())),
    hour: '10:00',
    patientSurvey: null,
    doctorSummary: null,
  }),
  seed.doc('9', {
    uid: '9',
    status: 'Closed',
    professional: {
      uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(new Date()),
    hour: '08:00',
    patientSurvey: 'I had a really good time',
    doctorSummary: 'A good patient!',
  }),
]);
patientAppointments
  .importDocuments(admin)
  .then(() => {
    console.log('Successfully imported documents.');
  })
  .catch((e) => {
    console.log('Failed to import documents: ' + e);
  });
let statisticsLogin = seed.collection('login-statistics', [
  seed.doc('1', {
    dateTime: formatISO(subDays(1)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(1)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(1)(new Date())))
    )}`,
    uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
  }),
  seed.doc('2', {
    dateTime: formatISO(subDays(1)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(1)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(1)(new Date())))
    )}`,
    uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
  }),
  seed.doc('3', {
    dateTime: formatISO(subDays(1)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(1)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(1)(new Date())))
    )}`,
    uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
  }),
  seed.doc('4', {
    dateTime: formatISO(subDays(1)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(1)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(1)(new Date())))
    )}`,
    uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
  }),
  seed.doc('5', {
    dateTime: formatISO(subDays(2)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(2)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(2)(new Date())))
    )}`,
    uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
  }),
  seed.doc('6', {
    dateTime: formatISO(subDays(2)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(2)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(2)(new Date())))
    )}`,
    uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
  }),
  seed.doc('7', {
    dateTime: formatISO(subDays(2)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(2)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(2)(new Date())))
    )}`,
    uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
  }),
  seed.doc('8', {
    dateTime: formatISO(subDays(2)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(2)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(2)(new Date())))
    )}`,
    uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
  }),
  seed.doc('9', {
    dateTime: formatISO(subDays(2)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(2)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(2)(new Date())))
    )}`,
    uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
  }),
  seed.doc('10', {
    dateTime: formatISO(subDays(2)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(2)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(2)(new Date())))
    )}`,
    uid: 'ub8Ln1Xlf4PnBreBXpVjJE42R4I3',
  }),
  seed.doc('11', {
    dateTime: formatISO(subDays(1)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(1)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(1)(new Date())))
    )}`,
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('12', {
    dateTime: formatISO(subDays(1)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(1)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(1)(new Date())))
    )}`,
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('13', {
    dateTime: formatISO(subDays(1)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(1)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(1)(new Date())))
    )}`,
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('14', {
    dateTime: formatISO(subDays(1)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(1)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(1)(new Date())))
    )}`,
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('15', {
    dateTime: formatISO(subDays(2)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(2)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(2)(new Date())))
    )}`,
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('16', {
    dateTime: formatISO(subDays(2)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(2)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(2)(new Date())))
    )}`,
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('17', {
    dateTime: formatISO(subDays(2)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(2)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(2)(new Date())))
    )}`,
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('18', {
    dateTime: formatISO(subDays(2)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(2)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(2)(new Date())))
    )}`,
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('19', {
    dateTime: formatISO(subDays(2)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(2)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(2)(new Date())))
    )}`,
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('20', {
    dateTime: formatISO(subDays(2)(new Date())),
    hour: `${getHours(new Date(formatISO(subDays(2)(new Date()))))}:${getMinutes(
      new Date(formatISO(subDays(2)(new Date())))
    )}`,
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
]);
statisticsLogin
  .importDocuments(admin)
  .then(() => {
    console.log('Successfully imported documents.');
  })
  .catch((e) => {
    console.log('Failed to import documents: ' + e);
  });
let operationStatistics = seed.collection(`operations-statistics`, [
  seed.doc('1', {
    type: 'Patient Attended',
    value: formatISO(subDays(1)(new Date())),
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('1', {
    type: 'attend',
    description: 'Patient Attended',
    value: formatISO(subDays(1)(new Date())),
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('2', {
    type: 'cancelled',
    description: 'Canceled Appointments',
    value: formatISO(subDays(1)(new Date())),
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('3', {
    type: 'cancelled',
    description: 'Canceled Appointments',
    value: formatISO(subDays(1)(new Date())),
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('4', {
    type: 'patient_survey',
    description: 'Answer Patient Survey',
    value: formatISO(subDays(1)(new Date())),
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('5', {
    type: 'attend',
    description: 'Patient Attended',
    value: formatISO(subDays(2)(new Date())),
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('6', {
    type: 'attend',
    description: 'Patient Attended',
    value: formatISO(subDays(2)(new Date())),
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('7', {
    type: 'cancelled',
    description: 'Canceled Appointments',
    value: formatISO(subDays(2)(new Date())),
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('8', {
    type: 'cancelled',
    description: 'Canceled Appointments',
    value: formatISO(subDays(2)(new Date())),
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('9', {
    type: 'dr_summary',
    description: 'Provided Dr Summary',
    value: formatISO(subDays(2)(new Date())),
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
  seed.doc('10', {
    type: 'patient_survey',
    description: 'Answer Patient Survey',
    value: formatISO(subDays(2)(new Date())),
    uid: 'cFGHEE0OQQTiHQKGjz2OtcMh4gZ2',
  }),
]);
operationStatistics
  .importDocuments(admin)
  .then(() => {
    console.log('Successfully imported documents.');
  })
  .catch((e) => {
    console.log('Failed to import documents: ' + e);
  });

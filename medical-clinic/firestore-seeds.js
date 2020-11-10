const admin = require('firebase-admin');
// serviceAccountKey.json can be generated in Firebase Console.
const serviceAccountKey = require('./admin-sdk.json');
const seed = require('firestore-seed');
const { addDays, formatISO } = require('date-fns/fp');
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
  seed.doc('dSO9jkAplOT4U3dLdPSSiyVENwT2', {
    email: 'cmori.94@gmail.com',
    firstTimeLogin: false,
    isProfessionalEnabled: true,
    name: 'Enrique Diaz',
    profile: 'professional',
    uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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
// appointments-doctor-{id}
let doctorAppointments = seed.collection('appointments-doctor-dSO9jkAplOT4U3dLdPSSiyVENwT2', [
  seed.doc('1', {
    status: 'Active',
    professional: {
      uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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
    status: 'Closed',
    professional: {
      uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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
    status: 'Cancelled',
    professional: {
      uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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
    status: 'Closed',
    professional: {
      uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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
    status: 'Active',
    professional: {
      uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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
    status: 'Active',
    professional: {
      uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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
    status: 'Active',
    professional: {
      uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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
    status: 'Active',
    professional: {
      uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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
    status: 'Closed',
    professional: {
      uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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
let doctorsCollection = seed.collection('doctors', [
  seed.doc('dSO9jkAplOT4U3dLdPSSiyVENwT2', {
    uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
    name: 'Enrique Diaz',
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
    status: 'Active',
    professional: {
      uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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
    status: 'Closed',
    professional: {
      uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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
    status: 'Cancelled',
    professional: {
      uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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
    status: 'Closed',
    professional: {
      uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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
    status: 'Active',
    professional: {
      uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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
    status: 'Active',
    professional: {
      uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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
    status: 'Active',
    professional: {
      uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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
    status: 'Active',
    professional: {
      uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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
    status: 'Closed',
    professional: {
      uid: 'dSO9jkAplOT4U3dLdPSSiyVENwT2',
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

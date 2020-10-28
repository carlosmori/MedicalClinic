const admin = require('firebase-admin');
// serviceAccountKey.json can be generated in Firebase Console.
const serviceAccountKey = require('./admin-sdk.json');
const seed = require('firestore-seed');
const { addDays, formatISO } = require('date-fns/fp');

// Initialize firebase-admin.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: 'https://medical-clinic-c44ab.firebaseio.com',
  storageBucket: 'medical-clinic-c44ab.appspot.com',
});

// Import seeds.
let usersCollection = seed.collection('users', [
  seed.doc('1', {
    email: 'carlosmori34@gmail.com',
    firstTimeLogin: false,
    isProfessionalEnabled: null,
    name: 'Carlos Mori',
    profile: 'Patient',
    uid: 'czqnyBHqRAgXWlQ4eifmx8jQK3J2',
  }),
  seed.doc('2', {
    email: 'cmori.94@gmail.com',
    firstTimeLogin: false,
    isProfessionalEnabled: true,
    name: 'Enrique Diaz',
    profile: 'Professional',
    uid: '9t65uPRjsqdTboKzHNTJPcdM8W93',
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
  seed.doc('1', {
    id: '9t65uPRjsqdTboKzHNTJPcdM8W93',
    name: 'Enrique Diaz',
    specialty: ['Cardiology', 'Traumato'],
    availability: [
      {
        Monday: ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'],
      },
      //   {
      //     Tuesday: [
      //       '08:00 AM',
      //       '09:00 AM',
      //       '10:00 AM',
      //       '11:00 AM',
      //       '12:00 AM',
      //       '01:00 PM',
      //       '02:00 PM',
      //       '03:00 PM',
      //       '04:00 PM',
      //     ],
      //   },
      //   {
      //     Wednesday: [
      //       '08:00 AM',
      //       '09:00 AM',
      //       '10:00 AM',
      //       '11:00 AM',
      //       '12:00 AM',
      //       '01:00 PM',
      //       '02:00 PM',
      //       '03:00 PM',
      //       '04:00 PM',
      //     ],
      //   },
      //   {
      //     Thursday: [
      //       '08:00 AM',
      //       '09:00 AM',
      //       '10:00 AM',
      //       '11:00 AM',
      //       '12:00 AM',
      //       '01:00 PM',
      //       '02:00 PM',
      //       '03:00 PM',
      //       '04:00 PM',
      //     ],
      //   },
      //   {
      //     Friday: [
      //       '08:00 AM',
      //       '09:00 AM',
      //       '10:00 AM',
      //       '11:00 AM',
      //       '12:00 AM',
      //       '01:00 PM',
      //       '02:00 PM',
      //       '03:00 PM',
      //       '04:00 PM',
      //     ],
      //   },
      //   {
      //     Saturday: [
      //       '08:00 AM',
      //       '09:00 AM',
      //       '10:00 AM',
      //       '11:00 AM',
      //       '12:00 AM',
      //       '01:00 PM',
      //       '02:00 PM',
      //       '03:00 PM',
      //       '04:00 PM',
      //     ],
      //   },
      //   {
      //     Sunday: [
      //       '08:00 AM',
      //       '09:00 AM',
      //       '10:00 AM',
      //       '11:00 AM',
      //       '12:00 AM',
      //       '01:00 PM',
      //       '02:00 PM',
      //       '03:00 PM',
      //       '04:00 PM',
      //     ],
      //   },
    ],
  }),
  seed.doc('2', {
    id: '2',
    name: 'Megan Fox',
    specialty: ['Clinic'],
    availability: [
      {
        Monday: [
          '08:00 AM',
          '09:00 AM',
          '10:00 AM',
          '11:00 AM',
          '12:00 AM',
          '01:00 PM',
          '02:00 PM',
          '03:00 PM',
          '04:00 PM',
          '05:00 PM',
          '06:00 PM',
        ],
      },
      {
        Tuesday: [
          '08:00 AM',
          '09:00 AM',
          '10:00 AM',
          '11:00 AM',
          '12:00 AM',
          '01:00 PM',
          '02:00 PM',
          '03:00 PM',
          '04:00 PM',
        ],
      },
    ],
  }),
  seed.doc('3', {
    id: '3',
    name: 'Leonardo Di Caprio',
    specialty: ['Pediatry', 'Cardiology'],
    availability: [
      {
        Thursday: [
          '08:00 AM',
          '09:00 AM',
          '10:00 AM',
          '11:00 AM',
          '12:00 AM',
          '01:00 PM',
          '02:00 PM',
          '03:00 PM',
          '04:00 PM',
          '05:00 PM',
          '06:00 PM',
        ],
      },
      {
        Friday: [
          '08:00 AM',
          '09:00 AM',
          '10:00 AM',
          '11:00 AM',
          '12:00 AM',
          '01:00 PM',
          '02:00 PM',
          '03:00 PM',
          '04:00 PM',
        ],
      },
    ],
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

let appointmentsCollection = seed.collection('appointments', [
  seed.doc('1', {
    status: 'Active',
    professional: {
      id: '9t65uPRjsqdTboKzHNTJPcdM8W93',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      id: 'czqnyBHqRAgXWlQ4eifmx8jQK3J2',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(1)(new Date())),
    // day: format('dd/MM/yyyy')(addDays(1)(new Date())),
    hour: '08:00 AM',
    patientSurvey: null,
    doctorReview: null,
  }),
  seed.doc('2', {
    status: 'Pending Dr Review',
    professional: {
      id: '9t65uPRjsqdTboKzHNTJPcdM8W93',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      id: 'czqnyBHqRAgXWlQ4eifmx8jQK3J2',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(new Date()),
    // day: format('dd/MM/yyyy')(addDays(1)(new Date())),
    hour: '08:00 AM',
    patientSurvey: null,
    doctorReview: 'He is a good patient',
  }),
  seed.doc('3', {
    status: 'Cancelled',
    professional: {
      id: '2',
      name: 'Megan Fox',
      specialty: 'Clinic',
    },
    patient: {
      id: 'czqnyBHqRAgXWlQ4eifmx8jQK3J2',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(2)(new Date())),
    // day: format('dd/MM/yyyy')(addDays(1)(new Date())),
    hour: '09:00 AM',
    patientSurvey: null,
    doctorReview: null,
  }),
  seed.doc('4', {
    status: 'Closed',
    professional: {
      id: '3',
      name: 'Leonardo Di Caprio',
      specialty: 'Pediatry',
    },
    patient: {
      id: 'czqnyBHqRAgXWlQ4eifmx8jQK3J2',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(new Date()),
    // day: format('dd/MM/yyyy')(addDays(1)(new Date())),
    hour: '10:00 AM',
    patientSurvey: 'He is a good patient',
    doctorReview: 'He is a good doctor',
  }),
  seed.doc('5', {
    status: 'Active',
    professional: {
      id: '9t65uPRjsqdTboKzHNTJPcdM8W93',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      id: 'czqnyBHqRAgXWlQ4eifmx8jQK3J2',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(1)(new Date())),
    // day: format('dd/MM/yyyy')(addDays(1)(new Date())),
    hour: '10:00 AM',
    patientSurvey: null,
    doctorReview: null,
  }),
  seed.doc('6', {
    status: 'Active',
    professional: {
      id: '9t65uPRjsqdTboKzHNTJPcdM8W93',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      id: 'czqnyBHqRAgXWlQ4eifmx8jQK3J2',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(1)(new Date())),
    // day: format('dd/MM/yyyy')(addDays(1)(new Date())),
    hour: '11:00 AM',
    patientSurvey: null,
    doctorReview: null,
  }),
  seed.doc('7', {
    status: 'Active',
    professional: {
      id: '9t65uPRjsqdTboKzHNTJPcdM8W93',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      id: 'czqnyBHqRAgXWlQ4eifmx8jQK3J2',
      name: 'Carlos Mori',
      email: 'carlosmori3@gmail.com',
    },
    day: formatISO(addDays(2)(new Date())),
    // day: format('dd/MM/yyyy')(addDays(1)(new Date())),
    hour: '09:00 AM',
    patientSurvey: null,
    doctorReview: null,
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
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
let doctorsCollection = seed.collection('doctors', [
  seed.doc('1', {
    id: '1',
    name: 'Enrique Diaz',
    specialty: ['Cardiology', 'Traumato'],
    availability: [
      {
        tuesday: [
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
      {
        wednesday: [
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
      {
        thursday: [
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

    // created: new Date(),
  }),
  seed.doc('2', {
    id: '2',
    name: 'Megan Fox',
    specialty: ['Clinic'],
    availability: [
      {
        monday: [
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
        tuesday: [
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
    specialty: ['Pediatry'],
    availability: [
      {
        thursday: [
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
        friday: [
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
      id: '1',
      name: 'Enrique Diaz',
      specialty: 'Traumato',
    },
    patient: {
      id: '1',
      name: 'Carlos Mori',
    },
    day: formatISO(addDays(1)(new Date())),
    // day: format('dd/MM/yyyy')(addDays(1)(new Date())),
    hour: '08:00 AM',
    patientReview: 'He is a good patient',
    doctorReview: 'He is a good doctor',
    // created: new Date(),
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

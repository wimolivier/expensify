import * as firebase from 'firebase';         // add all named exports onto a single new variable (this is just how the firebase module is built)

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

/*

// child_removed event
database.ref('expenses').on('child_removed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

// child_changed event
database.ref('expenses').on('child_changed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

// child_added event
database.ref('expenses').on('child_added', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

// database.ref('expenses').on('value', (snapshot) => {
//   const expenses = [];
//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });
//   console.log(expenses);
// });

// database.ref('expenses')
//   .once('value')
//   .then((snapshot) => {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });

//     console.log(expenses);
//   });

// database.ref('expenses').push({
//   description: 'Rent',
//   note: 'This months rent',
//   amount: 20050,
//   createdAt: 23434234332
// });

// database.ref('notes/-L1XTU-NmXjnRoXyD42v').remove();

// database.ref('notes').push({
//   title: 'Course Topics',
//   body: 'React Native, Angular, Python'
// });

// const firebaseNotes = {
//   notes: {
//     asdf: {
//       title: '1st title',
//       body: 'Note 1'
//     },
//     hjkl: {
//       title: '1st title',
//       body: 'Note 1'
//     }
//   }
// }

// const notes = [{
//   id: '12',
//   title: '1st title',
//   body: 'Note 1'
// },
// {
//   id: '43',
//   title: '1st title',
//   body: 'Note 1'
// }]
// database.ref().set(firebaseNotes);

// database.ref().on('value', (snapshot) => {
//   const val = snapshot.val();
//   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// });


// const onValueChange = database.ref().on('value', (snapshot) => {
//   console.log(snapshot.val());
// }, (e) => {
//   console.log('Error with data fetching:', e);
// });

// setTimeout(() => {
//   database.ref('age').set(29);
// }, 3500);

// setTimeout(() => {
//   database.ref().off('value', onValueChange);
// }, 7000);

// setTimeout(() => {
//   database.ref('age').set(30);
// }, 10500);

// database.ref()
//   .once('value')
//   .then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch((e) => {
//     console.log('Error fetching data', e);
//   });

// database.ref().set({
//   name: 'Wim Olivier',
//   age: 43,
//   stressLevel: 6,
//   job: {
//     title: 'Software developer',
//     company: 'Google'
//   },
//   location: {
//     city: 'Pretoria',
//     country: 'South Africa'
//   }
// }).then(() => {
//   console.log('Data is saved');
// }).catch((e) => {
//   console.log('This failed', e);
// });

// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seattle'
// });

// database.ref().set('This is my data');

// database.ref('age').set(42);
// database.ref('location/city').set('Centurion');

// database.ref('attributes').set({
//   height: 175,
//   weight: 90
// }).then(() => {
//   console.log('attributes added...');
// }).catch((e) => {
//   console.log('add attributes failed', e);
// });

// database.ref('isSingle')
//   .remove()
//   .then(() => {
//     console.log('Remove succeeded');
//   }).catch((e) => {
//     console.log('Failed to remove:', e.message);
//   });

// database.ref('isSingle').set(null);            // another way to remove data

*/
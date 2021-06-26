import firebase from 'firebase'
var firebaseConfig = {
  apiKey: 'AIzaSyBT1-b227LpiMjQVi7IgDvoZi01o6gjwQU',
  authDomain: 'farebear-7e41c.firebaseapp.com',
  projectId: 'farebear-7e41c',
  storageBucket: 'farebear-7e41c.appspot.com',
  messagingSenderId: '979963027209',
  appId: '1:979963027209:web:56409f0e1f308ce1847dd8',
  measurementId: 'G-GREHVT5B9R',
}

let fire
if (!firebase.apps.length) {
  fire = firebase.initializeApp(firebaseConfig)
} else {
  fire = firebase.app() // if already initialized, use that one
}

export default fire

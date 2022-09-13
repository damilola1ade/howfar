import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export const auth= firebase.initializeApp ({ apiKey: "AIzaSyDr9zYyIni-y65351KMlB1EMmLcD6t57_E",
authDomain: "howfar-9e2d4.firebaseapp.com",
projectId: "howfar-9e2d4",
storageBucket: "howfar-9e2d4.appspot.com",
messagingSenderId: "1026939081155",
appId: "1:1026939081155:web:f77a496c76ac6afdb5ad76"
}).auth();
   
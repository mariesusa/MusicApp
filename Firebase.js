import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCB8CYBy8ct60eZfWFklKEyUPsYd3vlkO0",
    authDomain: "musicapp-8225d.firebaseapp.com",
    databaseURL: "https://musicapp-8225d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "musicapp-8225d",
    storageBucket: "musicapp-8225d.appspot.com",
    messagingSenderId: "43560440428",
    appId: "1:43560440428:web:d4996c1e04bffaaae43e49",
    measurementId: "G-SPYF3DGHRD"
    };

const app = initializeApp(firebaseConfig);
export default getDatabase(app);


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

    apiKey: "AIzaSyCdIRkJf650vq-n7Is7oJ-hi0YpRAlRK5g",
  
    authDomain: "aiarthouse.firebaseapp.com",
  
    databaseURL: "https://aiarthouse-default-rtdb.firebaseio.com",
  
    projectId: "aiarthouse",
  
    storageBucket: "aiarthouse.appspot.com",
  
    messagingSenderId: "16027102020",
  
    appId: "1:16027102020:web:da87ff84fcd3470f1f4511",
  
    measurementId: "G-RF2C210MX6"
  
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  // eslint-disable-next-line
  const analytics = getAnalytics(app);

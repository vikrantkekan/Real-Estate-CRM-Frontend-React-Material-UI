import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmPQtBqeMv7vCyTAy0wcvQ57G1_p7T6gQ",
    authDomain: "dotscrm-afd5a.firebaseapp.com",
    projectId: "dotscrm-afd5a",
    storageBucket: "dotscrm-afd5a.firebasestorage.app",
    messagingSenderId: "265387977597",
    appId: "1:265387977597:web:144bc1e81f1bc86b8b7a14",
    measurementId: "G-YQHEPK2STE",
  };
  
  const app = initializeApp(firebaseConfig);

    export const messaging = getMessaging(app);

    export const generateToken= async()=>{
      const permission=await Notification.requestPermission();
      console.log(permission)
if(permission==='granted'){
  const token=await getToken(messaging,{
    vapidKey:""
  });
  //console.log(token);
  return token;
}else{
  //alert('Grant Notification permission')
}

    }

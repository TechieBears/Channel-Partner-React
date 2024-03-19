import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyAZlBsZL5-5bZgeeLb5txzel6VrwpwDCzI",
    authDomain: "instasmartbazaar.firebaseapp.com",
    projectId: "instasmartbazaar",
    storageBucket: "instasmartbazaar.appspot.com",
    messagingSenderId: "431507810489",
    appId: "1:431507810489:web:f8130c57ab168bd12bd368"
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
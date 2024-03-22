importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyAZlBsZL5-5bZgeeLb5txzel6VrwpwDCzI",
    authDomain: "instasmartbazaar.firebaseapp.com",
    projectId: "instasmartbazaar",
    storageBucket: "instasmartbazaar.appspot.com",
    messagingSenderId: "431507810489",
    appId: "1:431507810489:web:f8130c57ab168bd12bd368"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
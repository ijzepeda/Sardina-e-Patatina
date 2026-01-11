
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBBsZFnkBe4K3XqXv9rNG2PScuu0Le4wuQ",
    authDomain: "sardina-e-patatina.firebaseapp.com",
    projectId: "sardina-e-patatina",
    storageBucket: "sardina-e-patatina.firebasestorage.app",
    messagingSenderId: "482758001699",
    appId: "1:482758001699:web:950e0a3220f76d14a21d96",
    measurementId: "G-FWFNSNB3C4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

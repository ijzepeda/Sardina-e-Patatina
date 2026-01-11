
import { auth } from './firebase-config';
import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "firebase/auth";

const provider = new GoogleAuthProvider();
let currentUser = null;

export function initAuth(onUserChange) {
    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        onUserChange(user);
    });
}

export async function login() {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Login failed", error);
    }
}

export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Logout failed", error);
    }
}

export function getUser() {
    return currentUser;
}

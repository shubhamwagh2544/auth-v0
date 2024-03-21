import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
    apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
    authDomain: `${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`,
    projectId: "auth-v0-7cac6",
    storageBucket: `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: "1053640377170",
    appId: "1:1053640377170:web:4e1797a231c92143c0f08b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
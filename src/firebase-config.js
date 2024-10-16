import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD-XWrjMOmhRPjjRz-MOA1ARZN_RVwTcbc",
    authDomain: "skincare-recipe-tool.firebaseapp.com",
    projectId: "skincare-recipe-tool",
    storageBucket: "skincare-recipe-tool.appspot.com",
    messagingSenderId: "1053752399193",
    appId: "1:1053752399193:web:caf58158f655ca8e0f2848"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

setPersistence(auth, browserLocalPersistence);

export { auth, provider, db, signInWithPopup, signInWithRedirect, getRedirectResult, signOut };
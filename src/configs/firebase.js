import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut } from "firebase/auth";
import { getFirestore,orderBy, doc, setDoc, getDoc,deleteDoc, addDoc, collection, getDocs, query,updateDoc,onSnapshot,where } from "firebase/firestore";
import { getStorage,ref,uploadBytes,getDownloadURL } from "firebase/storage";
const firebaseApp = initializeApp({
    apiKey: "AIzaSyD1o79HwB6HE8yu7s7SxVncN-Zb5K9Y-SE",
    authDomain: "foodfestapp.firebaseapp.com",
    projectId: "foodfestapp",
    storageBucket: "foodfestapp.appspot.com",
    messagingSenderId: "575411274968",
    appId: "1:575411274968:web:030b7cc490d4fb442883ad",
    measurementId: "G-PHRPV4NSQ8"
});

const auth = getAuth();
const db = getFirestore();
const storage = getStorage(firebaseApp);

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,

    db,
    doc,
    setDoc,
    getDoc,
    addDoc,
    collection,
    getDocs,
    query,
    where,
    signOut,
    updateDoc,
    onSnapshot,
getFirestore,
orderBy,
storage,
ref,
uploadBytes,
getDownloadURL,
deleteDoc,


};


import { initializeApp } from 'firebase/app';
import {
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
createUserWithEmailAndPassword,
signInWithEmailAndPassword } from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAeurFAOZtYZat3FMGWHwGHbcPPIQkeul8",
    authDomain: "crwn-db-c56f9.firebaseapp.com",
    projectId: "crwn-db-c56f9",
    storageBucket: "crwn-db-c56f9.appspot.com",
    messagingSenderId: "965202284380",
    appId: "1:965202284380:web:4e46e6b8ec716693c7fb99"
  };
  
 const firebaseApp = initializeApp(firebaseConfig);

 const googleProvider = new GoogleAuthProvider();
 googleProvider.setCustomParameters({
     prompt: 'select_account'
 });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });

        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);

}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);

}
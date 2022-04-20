import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider } from 'firebase/auth';
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

 const provider = new GoogleAuthProvider();
 provider.setCustomParameters({
     prompt: 'select_account'
 });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
            });

        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
} 
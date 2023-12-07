import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore, doc, setDoc,getDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD9e0qRRKBkWy_WzRM_hgavYTw_zCSIpeE",
    authDomain: "clothing-shop-db-50856.firebaseapp.com",
    projectId: "clothing-shop-db-50856",
    storageBucket: "clothing-shop-db-50856.appspot.com",
    messagingSenderId: "1058670248046",
    appId: "1:1058670248046:web:d0109cd17c7aa7abe1267f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider({
    prompt:"select_account"
});

export const auth = getAuth();

export const signInWithGooglePopUp = ()=> signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) =>{
    const userDocRef = doc(db, 'users',userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName,email} = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createAt    
            })
        } catch (error) {
            console.log("error creating the user", error.message);
        }
        return userDocRef;
    }

}
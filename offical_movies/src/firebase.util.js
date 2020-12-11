import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';

//config for firebase 
const Config = {
	apiKey: "AIzaSyBIRooUbgX4lwBxlF61RDLit7oScrZhNc0",
    authDomain: "officalmovies-24ed4.firebaseapp.com",
    projectId: "officalmovies-24ed4",
	storageBucket: "officalmovies-24ed4.appspot.com",
	databaseURL:'https://officalmovies-24ed4-default-rtdb.firebaseio.com',
    messagingSenderId: "170295343139",
    appId: "1:170295343139:web:ee41364b0ec35764f59996"
};


export const createUserProfileDocument = async (userAuth, additionalData) => {
    //if the users has not login yet return from doing anything
    if (!userAuth) return;   
    //gets the ref for that specific user id
	const userRef = firestore.doc(`/users/${userAuth.uid}`);
    //gets the snapshot to determine whether or not there is data in that ref
	const snapShot = await userRef.get();
    //If there is nothing, if exists is false create/save the user info
	if (!snapShot.exists) {
		const { displayName, email, photoURL,phoneNumber } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
                createdAt,
                photoURL,
                phoneNumber,
				...additionalData
			});
		} catch (error) {
			console.log('Error creating user', error);
		}
    }
    
    return userRef
};


//init firebase with the config 
firebase.initializeApp(Config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

//google auth
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

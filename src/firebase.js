import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// import config from './config.json';

const config = {
    apiKey: "AIzaSyBOHIkUgOxaz1XTpwKgt1FfHg5eyOrLyps",
    authDomain: "aurorapp-3a992.firebaseapp.com",
    databaseURL: "https://aurorapp-3a992.firebaseio.com",
    projectId: "aurorapp-3a992",
    storageBucket: "gs://aurorapp-3a992.appspot.com",
    messagingSenderId: "590608251480"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithGoogle(provider);
export const signOut = () => auth.signOut();

firestore.settings({ timestampsInSnapshots: true});

// export const createUserProfileDocument = async (user, additionalData) => {
//     if(!user) return;

//     // Get a reference to the place in the database where the user might be
//     const userRef = firestore.doc(`user/${user.uid}`);

//     // GO and fetch the data from that location
//     const snapshot = await userRef.get();

//     // Si el documento no existe, vamos a crearlo
//     if (!snapshot.exists){

//         const { displayName, email, photoURL } = user ;
//         const createdAt = new Date();

//         try {
//             await userRef.set({
//                 displayName,
//                 email,
//                 photoURL,
//                 createdAt,
//                 ...additionalData,
//             })
//         } catch (error) {
//             console.error('Error creating user ', error);
//         };
//     }

//     return getUserDocuemnt(user.uid)
// }

// export const getUserDocument = async uid => {
//     if(!uid) return;
//     try {
//         return userDocument = await firestore
//         .collection('users')
//         .doc(uid)

//     } catch (error) {
//         console.error('Error fetching user ', error.message);
//     }
// }

export default firebase;


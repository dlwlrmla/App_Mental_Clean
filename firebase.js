import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBD5Lb1j8R1lapFgCGheWKfhP-hPp0qZLw",
    authDomain: "basededaatos.firebaseapp.com",
    projectId: "basededaatos",
    storageBucket: "basededaatos.appspot.com",
    messagingSenderId: "284249631499",
    appId: "1:284249631499:web:ff0e42d5bf57830453100e"
};


let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};
export const createUserDocument = async (user, additionalData) => {
    if (!user) return;

    const userRef = db.doc(`users/${user.uid}`);

    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { email } = user;
        const { displayName } = additionalData;

        try {
            await userRef.set({
                displayName,
                email,
                createdAt: new Date(),
            });
        } catch (error) {
            console.log('Error in creating user', error);
        }
    }
};

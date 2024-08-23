import { initializeApp } from 'firebase/app'
import { getFirestore, doc, addDoc, collection } from 'firebase/firestore'
import 'dotenv/config'

const {
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID
} = process.env;

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
};

let app;
export let firestoreDb;

export function initializeFirebaseApp() {
    try {
        app = initializeApp(firebaseConfig);
        firestoreDb = getFirestore();
        return app;
    } catch(error) {
        console.log(error);
    }
}

export async function uploadData(source, headline, link, img) {
    const data = {
        headlineText: headline,
        headlineLink: link,
        img: img
    };
    const day = new Date().toISOString().split('T')[0];
    
    try {
        const collect = collection(firestoreDb, 'scrapedData', day, source);
        await addDoc(collect, data);
    } catch(error) {
        console.log(error);
    }
}

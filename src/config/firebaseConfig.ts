import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { getConfig } from '.';

const config = getConfig();

export const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  databaseURL: config.FIREBASE_DB_URL,
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.FIREBASE_APP_ID,
  measurementId: config.FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);

export const myStorage = getStorage(app);
export const db = getFirestore(app);

// export const analytics = getAnalytics(app);

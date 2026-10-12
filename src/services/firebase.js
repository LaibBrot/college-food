import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA8LpPcLQP4q_ESKX1uH8iGXSXPAf82Ub8",
  authDomain: "midas-bd-ff00a.firebaseapp.com",
  projectId: "midas-bd-ff00a",
  storageBucket: "midas-bd-ff00a.firebasestorage.app",
  messagingSenderId: "182776076466",
  appId: "1:182776076466:web:c19bbad309ee55786691ab"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
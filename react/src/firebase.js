import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase Console -> Project settings -> Your apps -> firebaseConfig
const firebaseConfig = {
  apiKey: 'AIzaSyB-uPTSNM8N1u8lBsZ6P4eKG2bsxqgdsE0',
  authDomain: 'skillswap-c592a.firebaseapp.com',
  projectId: 'skillswap-c592a',
  storageBucket: 'skillswap-c592a.firebasestorage.app',
  messagingSenderId: '1055833294593',
  appId: '1:1055833294593:web:19e1646402f0fc76ea3d00',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' }); // always show "Choose an account"

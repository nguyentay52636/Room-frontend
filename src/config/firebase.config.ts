import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCn5tIC_iy8J5e71QBc2QAAa06EZHzXb14",
  authDomain: "new-live-4b1d4.firebaseapp.com",
  projectId: "new-live-4b1d4",
  storageBucket: "new-live-4b1d4.firebasestorage.app",
  messagingSenderId: "326011198969",
  appId: "1:326011198969:web:42149add79da116947f128",
  measurementId: "G-5T8TDHZVZV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Add additional configuration to ensure proper Google Sign-In setup
provider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, firebaseConfig, app, provider }; 
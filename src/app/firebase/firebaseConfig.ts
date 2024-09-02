import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDNZP5YMgEwAOlcT1qygrNFyEfYYZj9bo",
  authDomain: "thuctap-nextjs.firebaseapp.com",
  projectId: "thuctap-nextjs",
  storageBucket: "thuctap-nextjs.appspot.com",
  messagingSenderId: "346502247691",
  appId: "1:346502247691:web:d093516bb42adefc909e0e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

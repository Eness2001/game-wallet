import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC4OxHqmbj1T711iqvG_8Jqkpdhy_EQ1uI",
  authDomain: "game-wallet-fd4b9.firebaseapp.com",
  projectId: "game-wallet-fd4b9",
  storageBucket: "game-wallet-fd4b9.appspot.com",
  messagingSenderId: "530157053279",
  appId: "1:530157053279:web:e8f4fb3422a6f0e95fc2ea",
  measurementId: "G-4M6EFLN2B3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
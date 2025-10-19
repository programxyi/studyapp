import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth'; // initializeAuth はそのまま
// getReactNativePersistence は /react-native からインポート
// TypeScript may not find type declarations for 'firebase/auth/react-native' in some setups,
// so require it at runtime and suppress the TS check here.
// @ts-ignore
const { getReactNativePersistence } = require('firebase/auth/react-native');

import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore"; // Firestore用
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFgNbs8AnuSmu37log8EFOlMFmrqxbJS4",
  authDomain: "studyapp-d5d0c.firebaseapp.com",
  projectId: "studyapp-d5d0c",
  storageBucket: "studyapp-d5d0c.firebasestorage.app",
  messagingSenderId: "276907237423",
  appId: "1:276907237423:web:067c294cbf0b4618e066da",
  measurementId: "G-K93ZF3J917"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ★★★ Firestoreを初期化し、オフライン永続性を有効化 ★★★
const firestore = initializeFirestore(app, {
    localCache: persistentLocalCache(/*settings*/{tabManager: persistentMultipleTabManager()})
});

// ★★★ AsyncStorageを使って認証状態を永続化 ★★★
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// 初期化されたインスタンスをエクスポートして、他のファイルで使えるようにする
export { app, auth, firestore };


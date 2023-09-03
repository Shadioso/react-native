// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Функція для підключення авторизації в проект
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQop4EED-M3PTAaQUBdSz5qhGzaKQdz10",
  authDomain: "mobile-blog-3fcba.firebaseapp.com",
  databaseURL: "https://mobile-blog-3fcba.firebaseio.com",
  messagingSenderId: "799003187232",
  appId: "1:799003187232:web:eca0b2e8c21fe38701c445",
  projectId: "mobile-blog-3fcba",
  storageBucket: "mobile-blog-3fcba.appspot.com",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);

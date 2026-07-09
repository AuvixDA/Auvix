// Общая инициализация Firebase для сайта AUVIX
// Подключается через <script type="module"> в cases.html и admin.html

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDUPbOlljgoVm91gZyw0PsZZXJviv60CcM",
  authDomain: "auvixsait.firebaseapp.com",
  databaseURL: "https://auvixsait-default-rtdb.firebaseio.com",
  projectId: "auvixsait",
  storageBucket: "auvixsait.firebasestorage.app",
  messagingSenderId: "888906023640",
  appId: "1:888906023640:web:f78e536f905f5edb2b0dad"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export {
  collection, doc, getDocs, getDoc, addDoc, setDoc, deleteDoc, query, orderBy, serverTimestamp,
  signInWithEmailAndPassword, signOut, onAuthStateChanged
};

// Настройки Cloudinary (загрузка фото без бэкенда, unsigned preset)
export const CLOUDINARY_CLOUD_NAME = "vhtsxtc2";
export const CLOUDINARY_UPLOAD_PRESET = "casess";

export async function uploadImageToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(url, { method: "POST", body: formData });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error("Ошибка загрузки в Cloudinary: " + errText);
  }
  const data = await res.json();
  return data.secure_url;
}

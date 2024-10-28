
// Importa las funciones necesarias desde el SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Agrega Firestore

// Configuración de Firebase para tu aplicación web
const firebaseConfig = {
  apiKey: "AIzaSyADVLBjBDLRvJiPLQydy0kr4Z7i5E_OuTE",
  authDomain: "mini-spa.firebaseapp.com",
  projectId: "mini-spa",
  storageBucket: "mini-spa.appspot.com",
  messagingSenderId: "192036380365",
  appId: "1:192036380365:web:0b830225e543d2a3edd384"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa y exporta Firestore para uso en la app
export const db = getFirestore(app);

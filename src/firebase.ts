import { initializeApp } from "firebase/app";
import { getFirestore, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, deleteObject, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export const deletePost = async (postId: string, imageUrl: string | null) => {
  try {
    // Delete the post document from Firestore
    await deleteDoc(doc(db, "posts", postId));

    // If there's an associated image, delete it from Storage
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export { db, auth, storage };

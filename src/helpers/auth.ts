import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";
import { auth, db } from "../firebase/firebase-config";
import { doc, getDoc, serverTimestamp, setDoc } from "@firebase/firestore";

interface registerProps {
  displayName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const registerWithEmailAndPassword = createAsyncThunk('admin/register', async ({displayName, email, password, isAdmin}: registerProps, { rejectWithValue }) => {
  try {
    // Crear el usuario con Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Actualizar displayName en Auth
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName })
    }
    // Crear documento en Firestore
    const userData = {
      uid: auth.currentUser?.uid as string,
      email,
      displayName,
      isAdmin,
      createAt: serverTimestamp()
    }
    await setDoc(doc(db, "usuarios", userData.uid), userData);

    return {
      uid: userCredential.user.uid,
      email,
      displayName,
      isAdmin,
      createdAt: new Date().toISOString()
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/email-already-in-use") {
        return rejectWithValue("No puedes usar este correo porque ya está vinculado a otra cuenta.");
      }
      return rejectWithValue(error.code);
    }
    return rejectWithValue("Ocurrió un error desconocido");
  }
})

interface LoginProps {
  email: string;
  password: string;
}

export const loginWithEmailAndPassword = createAsyncThunk('user/login', async ({ email, password }: LoginProps, { rejectWithValue }) => {
  try {
    // Autenticar al usuario
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredentials.user;
    // Buscar los datos adicionales en Firestore
    const userDocRef = doc(db, "usuarios", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return rejectWithValue("Los datos del usuario no existen en Firestore.");
    }
    const firestoreData = userDoc.data();
    // Devolver los datos del usuario
    return {
      uid: user.uid,
      displayName: user.displayName as string,
      email: user.email as string,
      isAdmin: firestoreData.isAdmin
    }

  } catch (error) {
    if (error instanceof FirebaseError) {
      return rejectWithValue(error.code);
    }
    return rejectWithValue("Ocurrió un error desconocido al iniciar sesión.");
  }
})

export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    if (error instanceof FirebaseError) {
      return rejectWithValue(error.code);
    }
    return rejectWithValue("Ocurrió un error desconocido al cerrar sesión.");
  }
})
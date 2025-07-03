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
    await createUserWithEmailAndPassword(auth, email, password);
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
      createdAt: serverTimestamp()
    }
    await setDoc(doc(db, "usuarios", userData.uid), userData);

    return {
      uid: userData.uid,
      email,
      displayName,
      isAdmin,
      isLeaderCrew: false,
      password: "",
      phone: "",
      createdBy: "",
      createdAt: userData.createdAt
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

    // Buscar los datos en coleccion usuarios
    const userRef = doc(db, "usuarios", user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        uid: data.uid,
        displayName: data.displayName,
        email: data.email,
        isAdmin: data.isAdmin,
        isLeaderCrew: data.isLeaderCrew || false,
        password: data.password,
        phone: data.phone,
        createdBy: data.createBy,
        createdAt: data.createdAt.toDate().toISOString(),
      };
    }

    // Buscar los datos en coleccion contratistas
    const contractorRef = doc(db, "contratistas", user.uid);
    const contractorSnap = await getDoc(contractorRef);
    if (contractorSnap.exists()) {
      const data = contractorSnap.data();
      return {
        uid: data.uid,
        displayName: data.displayName,
        email: data.email,
        isAdmin: false,
        isLeaderCrew: data.isLeaderCrew || false,
        password: data.password,
        phone: data.phone,
        createdBy: data.createdBy,
        createdAt: data.createdAt.toDate().toISOString(),
      };
    }

    return rejectWithValue("El usuario no está registrado como admin ni contratista.");

  } catch (error) {
    console.log(error)
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
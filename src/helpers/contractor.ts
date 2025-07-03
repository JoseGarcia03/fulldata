import { createAsyncThunk } from "@reduxjs/toolkit";
import { db, functions } from "../firebase/firebase-config";
import { httpsCallable } from "firebase/functions";
import { FirebaseError } from "firebase/app";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

interface ContractorProps {
  name: string;
  email: string;
  password: string;
  phone: string;
  isLeaderCrew: boolean;
  crew: string;
  createdBy: string;
  createdAt?: string;
}

export interface deleteCrewProps {
  id: string;
  isLeaderCrew: boolean;
  crew: string;
}

export const getContractors = createAsyncThunk("contractors/getContractors", async (_, { rejectWithValue }) => {
  try {
    const contractorsRef = collection(db, "contratistas");
    const snapshot = await getDocs(contractorsRef);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString() ?? null,
      };
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Ocurrió un error desconocido");
  }
});

export const registerContractor = createAsyncThunk("contractors/registerContractor", async ({
  name,
  email,
  password,
  phone,
  isLeaderCrew,
  crew,
  createdBy,
}: ContractorProps, { rejectWithValue }) => {
    const createContractorCallable = httpsCallable(functions, "createContractor");
    try {
      const result = await createContractorCallable({ name, email, password, phone, isLeaderCrew, crew, createdBy });
      return result.data;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ocurrió un error desconocido");
    }
})

export const deleteContractor = createAsyncThunk("contractors/deleteContractor", async (data: deleteCrewProps, { rejectWithValue }) => {
  const deleteAuthContractor = httpsCallable(functions, "deleteAuthContractor");
  try {
    // Delete the contractor from Firebase Auth
    await deleteAuthContractor({ uid: data.id });
    // Delete the contractor document from Firestore
    const contractorRef = doc(db, "contratistas", data.id);
    await deleteDoc(contractorRef);
    // If the contractor is a leader of a crew, delete the crew document
    if (data.isLeaderCrew) {
      const crewRef = doc(db, "cuadrillas", data.crew.toLocaleLowerCase());
      await deleteDoc(crewRef);
    }
    return;
  } catch ( error ) {
    if (error instanceof FirebaseError) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Ocurrió un error desconocido");
  }
});
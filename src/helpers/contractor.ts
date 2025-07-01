import { createAsyncThunk } from "@reduxjs/toolkit";
import { db, functions } from "../firebase/firebase-config";
import { httpsCallable } from "firebase/functions";
import { FirebaseError } from "firebase/app";
import { collection, getDocs } from "firebase/firestore";

interface ContractorProps {
  name: string;
  email: string;
  password: string;
  phone: string;
  isLeaderCrew: boolean;
  crew: string;
  createdBy: string;
  createdAt: string;
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
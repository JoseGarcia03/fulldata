import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { FirebaseError } from "firebase/app";

export interface MaterialsProps {
  contractorName: string;
  id: string;
  name: string;
  ticket: string;
  type: string;
  value: string | number;
  visitDate: string;
  createdAt: string;
}

export const fetchMaterials = createAsyncThunk<MaterialsProps[]>(
  "materials/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const snap = await getDocs(collection(db, "materiales"));
      return snap.docs.map((doc) => doc.data() as MaterialsProps);
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.code);
      }
      return rejectWithValue("No se pudieron cargar los materiales");
    }
  }
);

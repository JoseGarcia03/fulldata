import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { FirebaseError } from "firebase/app";

interface CrewProps {
  id: string;
  label: string;
  value: string;
  createdBy: string;
  name: string;
  createdAt: string;
}

export const getCrews = createAsyncThunk("crew/getCrews", async (_, { rejectWithValue }) => {
    try {
      const crewsRef = collection(db, "cuadrillas");
      const snapshot = await getDocs(crewsRef);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate().toISOString() ?? null, // o .getTime() si prefieres timestamp
        };
      }) as CrewProps[];
    } catch (error) {
      if (error instanceof FirebaseError) {

        return rejectWithValue(error.code);
      }
      return rejectWithValue("No se pudieron cargar las cuadrillas");
    }
  }
)
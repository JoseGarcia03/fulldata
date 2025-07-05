import { createAsyncThunk } from "@reduxjs/toolkit";
import type { MaterialItem } from "../components/damage/MaterialSelector";
import {
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { FirebaseError } from "firebase/app";

interface DamageProps {
  ticket: string;
  crew: string;
  visitDate: string;
  contractorName: string;
  comments: string;
  materials: MaterialItem[];
  createdAt: string;
}

export const registerDamage = createAsyncThunk(
  "damage/createDamage",
  async (
    {
      ticket,
      crew,
      visitDate,
      contractorName,
      comments,
      materials,
      createdAt,
    }: DamageProps,
    { rejectWithValue }
  ) => {
    try {
      const damageRef = doc(db, "averias", ticket);
      const materialsCol = collection(db, "materiales");

      await runTransaction(db, async (transaction) => {
        // 2. chequeo de existencia
        const existing = await transaction.get(damageRef);
        if (existing.exists()) {
          throw new Error("Ya existe una avería para este número de ticket");
        }

        transaction.set(damageRef, {
          ticket,
          visitDate,
          contractorName,
          crew,
          comments,
          materials,
          createdAt,
        });

        for (const m of materials) {
          const materialRef = doc(materialsCol);

          transaction.set(materialRef, {
            ticket,
            visitDate,
            contractorName,
            ...m,
          });
        }
      });

      return true;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(`${error}`);
    }
  }
);

export const getDamage = createAsyncThunk(
  "damage/getDamage",
  async (_, { rejectWithValue }) => {
    try {
      const damageRef = collection(db, "averias");
      const damageSnap = await getDocs(damageRef);
      return damageSnap.docs.map((doc) => {
        const data = doc.data();
        return data;
      }) as DamageProps[];
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.code);
      }
      return rejectWithValue("No se pudieron cargar las averías");
    }
  }
);

export const deleteDamage = createAsyncThunk(
  "damage/delete",
  async (ticketId: string, { rejectWithValue }) => {
    try {
      // Referencia a la averia
      const ticketRef = doc(db, "averias", ticketId);
      // Query para los materiales asociados
      const materialsQuery = query(
        collection(db, "materiales"),
        where("ticket", "==", ticketId)
      );
      // Obtenemos los materiales asociados
      const materialsSnap = await getDocs(materialsQuery);
      // Batch para la eliminacion del conjunto
      const batch = writeBatch(db);
      batch.delete(ticketRef);

      materialsSnap.forEach( matDoc => batch.delete(matDoc.ref));

      await batch.commit();
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.code);
      }
      return rejectWithValue("Ocurrio un error inesperado al intentar borrar la avería");
    }
  }
);

import { createSlice } from "@reduxjs/toolkit";
import { deleteDamage, getDamage, registerDamage } from "../../helpers/damage";

interface MaterialsProps {
  id: string;
  name: string;
  type: string;
  value: string | number;
}

export interface DamageProps {
  ticket: string;
  contractorName: string;
  crew: string;
  visitDate: string;
  comments: string;
  materials: MaterialsProps[];
  createdAt: string;
}

const initialState = {
  damage: [] as DamageProps[],
  loading: false,
  error: "",
};

export const DamageSlice = createSlice({
  name: "damage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerDamage.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(registerDamage.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(registerDamage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getDamage.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getDamage.fulfilled, (state, action) => {
      state.damage = action.payload as DamageProps[];
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getDamage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(deleteDamage.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteDamage.fulfilled, (state, action) => {
      state.loading = false;
      state.damage = state.damage.filter(dm => dm.ticket !== action.meta.arg);
      state.error = "";
    });
    builder.addCase(deleteDamage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default DamageSlice.reducer;

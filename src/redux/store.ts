import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './slices/authSlice';
import ContractorsSlice from "./slices/contractorSlice";
import CrewSlice from './slices/crewSlice';
import DamageSlice from "./slices/damageSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    contractors: ContractorsSlice,
    crews: CrewSlice,
    damage: DamageSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

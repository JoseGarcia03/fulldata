import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './slices/authSlice';
import ContractorsSlice from "./slices/contractorSlice";
import CrewSlice from './slices/crewSlice';

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    contractors: ContractorsSlice,
    crews: CrewSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

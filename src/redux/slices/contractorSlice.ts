import { createSlice } from "@reduxjs/toolkit";
import { deleteContractor, getContractors, registerContractor } from "../../helpers/contractor";

export interface ContractorProps {
  uid: string;
  displayName: string;
  email: string;
  password: string;
  phone: string;
  isLeaderCrew: boolean;
  crew?: string;
  createdAt?: string;
}

const initialState = {
  contractors: [] as ContractorProps[],
  loading: false,
  error: "",
}

export const ContractorsSlice = createSlice({
  name: "contractors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerContractor.pending, (state) => {
      state.loading = true;
      state.error = "";
    })
    builder.addCase(registerContractor.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    })
    builder.addCase(registerContractor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    builder.addCase(getContractors.pending, (state) => {
      state.loading = true;
      state.error = "";
    })
    builder.addCase(getContractors.fulfilled, (state, action) => {
      state.loading = false;
      state.contractors = action.payload as ContractorProps[];
      state.error = "";
    })
    builder.addCase(getContractors.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    builder.addCase(deleteContractor.pending, (state) => {
      state.loading = true;
      state.error = "";
    })
    builder.addCase(deleteContractor.fulfilled, (state, action) => {
      state.loading = false;
      state.contractors = state.contractors.filter(contractor => contractor.uid !== action.meta.arg.uid);
      state.error = "";
    })
    builder.addCase(deleteContractor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
  }
})

export default ContractorsSlice.reducer;
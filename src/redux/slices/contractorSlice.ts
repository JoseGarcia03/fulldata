import { createSlice } from "@reduxjs/toolkit";
import { getContractors, registerContractor } from "../../helpers/contractor";

interface ContractorProps {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  isLeaderCrew: boolean;
  crew: string;
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
  }
})

export default ContractorsSlice.reducer;
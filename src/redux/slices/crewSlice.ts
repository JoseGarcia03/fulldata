import { createSlice } from "@reduxjs/toolkit";
import { getCrews } from "../../helpers/crew";

interface CrewProps {
  id: string;
  label: string;
  value: string;
  createdBy: string;
  name: string;
  createdAt: string;
}

const initialState = {
  crews: [] as CrewProps[],
  loading: false,
  error: "",
}

export const CrewSlice = createSlice({
  name: "crew",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCrews.pending, (state) => {
      state.loading = true;
      state.error = "";
    })
    builder.addCase(getCrews.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.crews = action.payload;
    })
    builder.addCase(getCrews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
  },
})

export default CrewSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { fetchMaterials, type MaterialsProps } from "../../helpers/materials";

interface MaterialsState {
  items: MaterialsProps[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
}

const initialState: MaterialsState = {
  items: [],
  status: "idle",
  error: ""
}

const MaterialSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b
      .addCase(fetchMaterials.pending, (state) => {
        state.status = "loading"
        state.error = ""
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.items = action.payload
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
  }
})

export default MaterialSlice.reducer;
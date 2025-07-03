import { createSlice } from "@reduxjs/toolkit";
import { loginWithEmailAndPassword, logout, registerWithEmailAndPassword } from "../../helpers/auth";

interface AuthState {
  uid: string;
  displayName: string;
  email: string;
  isAdmin: boolean;
  isLeaderCrew: boolean;
  password?: string;
  phone?: string;
  createdBy?: string;
  createdAt: string;
  loading: boolean;
  verifying: boolean;
  error: string;
}

const initialState: AuthState = {
  uid: "",
  displayName: "",
  email: "",
  isAdmin: false,
  isLeaderCrew: false,
  createdAt: "",
  loading: false,
  verifying: true,
  error: ""
}

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser( state, action ) {
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      state.isLeaderCrew = action.payload.isLeaderCrew || false;
      state.password = action.payload.password || "";
      state.phone = action.payload.phone || "";
      state.createdBy = action.payload.createdBy || "";
      state.createdAt = action.payload.createdAt;
      state.loading = false;
      state.verifying = false;
      state.error = "";
    },
    clearUser( state ) {
      state.uid = "";
      state.displayName = "";
      state.email = "";
      state.isAdmin = false;
      state.isLeaderCrew = false;
      state.password = "";
      state.phone = "";
      state.createdBy = "";
      state.createdAt = "";
      state.loading = false;
      state.verifying = false;
      state.error = "";
    }
  },
  extraReducers: builder => {
    builder.addCase(registerWithEmailAndPassword.pending, ( state ) => {
      state.loading = true;
    })
    builder.addCase(registerWithEmailAndPassword.fulfilled, ( state, action ) => {
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      state.loading = false;
    })
    builder.addCase(registerWithEmailAndPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    builder.addCase(loginWithEmailAndPassword.pending, ( state ) => {
      state.loading = true;
    })
    builder.addCase(loginWithEmailAndPassword.fulfilled, ( state, action ) => {
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      state.isLeaderCrew = action.payload.isLeaderCrew || false;
      state.password = action.payload.password;
      state.phone = action.payload.phone;
      state.createdBy = action.payload.createdBy;
      state.createdAt = action.payload.createdAt;
      state.verifying = false;
      state.loading = false;
    })
    builder.addCase(loginWithEmailAndPassword.rejected, (state, action) => {
      state.verifying = false;
      state.loading = false;
      state.error = action.payload as string;
    })
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.uid = "";
      state.displayName = "";
      state.email = "";
      state.isAdmin = false;
      state.isLeaderCrew = false;
      state.password = "";
      state.phone = "";
      state.createdBy = "";
      state.createdAt = "";
      state.loading = false;
      state.verifying = false;
      state.error = "";
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { setUser, clearUser } = AuthSlice.actions;
export default AuthSlice.reducer;
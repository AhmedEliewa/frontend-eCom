import type { TLoading } from "@/types/loading";
import { createSlice } from "@reduxjs/toolkit";
import { actRegister } from "./act/actRegister";
import { actLogin } from "./act/actLogin";

interface AuthState {
  loading: TLoading;
  error: string | null;
  accessToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  } | null;
}

const initialState: AuthState = {
  loading: "idle",
  error: null,
  accessToken: "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearerror: (state) => {
      state.error = null;
      state.loading = "idle";
    },
    logout: (state) => {
      state.accessToken = "";
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(actRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actRegister.fulfilled, (state) => {
      state.loading = "succeeded";
      state.error = null;
    });
    builder.addCase(actRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    //login
    builder.addCase(actLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(actLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const { clearerror, logout } = authSlice.actions;

export default authSlice.reducer;

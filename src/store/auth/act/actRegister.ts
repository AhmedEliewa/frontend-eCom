import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
type TFormData = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const actRegister = createAsyncThunk(
  "auth/actRegister",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post("/register", formData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

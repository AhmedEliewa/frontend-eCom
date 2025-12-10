import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TFormData = {
  email: string;
  password: string;
};

type TResponse = {
  accessToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
};

export const actLogin = createAsyncThunk(
  "auth/actLogin",
  async (formdata: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post<TResponse>("/login", formdata);
      console.log(response);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || error.response?.data.message || error.message
        );
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

import type { RootState } from "@/store/index";
import type { TProduct } from "@/types/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = { id: number; items: TProduct[]; subTotal: number }[];

export const actGetPlaceOrder = createAsyncThunk(
  "order/actGetPlaceOrder",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI;

    const { auth } = getState() as RootState;

    try {
      const res = await axios.get<TResponse>(
        `/orders?userId=${auth.user?.id}`,
        {
          signal,
        }
      );
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("Something went wrong");
      }
    }
  }
);

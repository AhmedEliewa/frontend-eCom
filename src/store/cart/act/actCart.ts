import type { RootState } from "@/store/index";
import type { TProduct } from "@/types/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = TProduct[];
export const actCart = createAsyncThunk("cart/actCart", async (_, thunkAPI) => {
  const { rejectWithValue, getState, fulfillWithValue } = thunkAPI;
  const { cart } = getState() as RootState;
  const { items } = cart;
  const concatenatedIds = Object.keys(items)
    .map((id) => `id=${id}`)
    .join("&");

  if (!Object.keys(items).length) return fulfillWithValue([]);

  try {
    const res = await axios.get<TResponse>(`/products?${concatenatedIds}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message || error.message);
    } else {
      return rejectWithValue("Something went wrong");
    }
  }
});

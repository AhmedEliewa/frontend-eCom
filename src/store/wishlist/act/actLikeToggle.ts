import type { RootState } from "@/store//index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (id: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    const isRecord = await axios.get(
      `/wishlist?userId=${auth.user?.id}&productId=${id}`
    );
    try {
      if (isRecord.data.length) {
        await axios.delete(`/wishlist/${isRecord.data[0].id}`);
        return { type: "remove", id };
      } else {
        axios.post(`/wishlist`, {
          userId: auth.user?.id,
          productId: id,
        });
        return { type: "add", id };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("Something went wrong");
      }
    }
  }
);

import type { RootState } from "@/store/index";
import type { TProduct } from "@/types/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = TProduct[];
type TDataType = "productsFullInfo" | "productsIds";

export const actWishlist = createAsyncThunk(
  "wishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI;
    const { auth } = getState() as RootState;
    const userProduct = await axios.get<{ productId: number }[]>(
      `/wishlist?userId=${auth.user?.id}`,
      { signal }
    );
    if (!userProduct.data.length)
      return {
        data: [],
        dataType: "empty",
      };
    try {
      if (dataType === "productsIds") {
        const productIds = userProduct.data.map((item) => item.productId);
        return { data: productIds, dataType: "productsIds" };
      } else {
        const productIds = userProduct.data
          .map((id) => `id=${id.productId}`)
          .join("&");

        const res = await axios.get<TResponse>(`/products?${productIds}`);
        return { data: res.data, dataType: "productsFullInfo" };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("un expected error !");
      }
    }
  }
);

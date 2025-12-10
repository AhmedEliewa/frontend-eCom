import type { TLoading } from "@/types/loading";
import type { TProduct } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";
import { actProduct } from "./act/actProduct";

interface IProductState {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: IProductState = {
  records: [],
  loading: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    cleanProduct: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actProduct.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actProduct.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actProduct.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const { cleanProduct } = productSlice.actions;
export default productSlice.reducer;

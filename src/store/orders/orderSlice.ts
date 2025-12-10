import type { TLoading } from "@/types/loading";
import type { TProduct } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";
import actPlaceOrder from "./act/actPlaceOrder";
import { actGetPlaceOrder } from "./act/actGetPlaceOrder";

type OrderState = {
  loading: TLoading;
  error: string | null;
  orders: { id: number; items: TProduct[]; subTotal: number }[];
};

const initialState: OrderState = {
  loading: "idle",
  error: null,
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.loading = "idle";
    },
  },
  // send order
  extraReducers: (builder) => {
    builder.addCase(actPlaceOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actPlaceOrder.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    builder.addCase(actGetPlaceOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetPlaceOrder.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.orders = action.payload;
    });
    builder.addCase(actGetPlaceOrder.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;

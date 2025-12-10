import type { TLoading } from "@/types/loading";
import type { TProduct } from "@/types/product";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { actCart } from "./act/actCart";
import type { RootState } from "../index";

interface ICartState {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
  items: { [key: string]: number };
}

const initialState: ICartState = {
  records: [],
  loading: "idle",
  error: null,
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //custom method that i made it first
    // addToCart: (state, action) => {
    //   const product = action.payload;
    //   const existingItem = state.records.find((item) => item.id === product.id);
    //   if (existingItem) {
    //     state.records = state.records.map((item) =>
    //       item.id === product.id
    //         ? {
    //             ...item,
    //             quantity: item.quantity + 1,
    //           }
    //         : item
    //     );
    //   } else {
    //     state.records.push({ ...product, quantity: 1 });
    //   }
    // },
    // changeQuantity: (state, action) => {
    //   state.records = state.records.map((item) =>
    //     item.id === action.payload.id
    //       ? { ...item, quantity: action.payload.quantity }
    //       : item
    //   );
    // },

    //method in the videos
    //addToCart
    addToCart: (state, action) => {
      const id = action.payload;

      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    //changeQuantity
    changeQuantity: (state, action) => {
      const id = action.payload.id;
      const { quantity } = action.payload;
      state.items[id] = quantity;
    },

    //removeProduct
    removeProduct: (state, action) => {
      const id = action.payload;
      console.log(id);
      delete state.items[id];
      state.records = state.records.filter((prod) => prod.id !== id);
    },
    clearAddToCartAfterOrder: (state) => {
      state.items = {};
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actCart.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actCart.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });

    builder.addCase(actCart.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const getCartTotalQuantitySelector = createSelector(
  [(state: RootState) => state.cart.items],
  (items) => {
    return Object.values(items as { [key: string]: number }).reduce(
      (total, quantity) => total + quantity,
      0
    );
  }
);

export const {
  addToCart,
  changeQuantity,
  removeProduct,
  clearAddToCartAfterOrder,
} = cartSlice.actions;
export default cartSlice.reducer;

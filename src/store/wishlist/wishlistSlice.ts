// import { createSlice } from "@reduxjs/toolkit";
// import { actLikeToggle } from "./act/actLikeToggle";
// import { actWishlist } from "./act/actWishlist";
// import type { TLoading } from "@/types/loading";
// import type { TProduct } from "@/types/product";

// type TWishlistState = {
//   itemsId: number[];
//   error: string | null;
//   loading: TLoading;
//   records: TProduct[];
// };

// const initialState: TWishlistState = {
//   itemsId: [],
//   error: null,
//   loading: "idle",
//   records: [],
// };

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState,
//   reducers: {
//     cleanWishlist: (state) => {
//       state.records = [];
//     },
//   },
//   extraReducers: (builder) => {
//     // toggle like
//     builder.addCase(actLikeToggle.pending, (state) => {
//       state.error = null;
//     });
//     builder.addCase(actLikeToggle.fulfilled, (state, action) => {
//       if (action.payload.type === "add") {
//         state.itemsId.push(action.payload.id);
//       } else {
//         state.itemsId = state.itemsId.filter((id) => id !== action.payload.id);
//         state.records = state.records.filter(
//           (prod) => prod.id !== action.payload.id
//         );
//       }
//     });
//     builder.addCase(actLikeToggle.rejected, (state, action) => {
//       if (action.payload && typeof action.payload === "string") {
//         state.error = action.payload;
//       }
//     });

//     // get wishlist
//     builder.addCase(actWishlist.pending, (state) => {
//       state.loading = "pending";
//       state.error = null;
//     });
//     builder.addCase(actWishlist.fulfilled, (state, action) => {
//       state.loading = "succeeded";
//       state.records = action.payload;
//     });
//     builder.addCase(actWishlist.rejected, (state, action) => {
//       state.loading = "failed";
//       if (action.payload && typeof action.payload === "string") {
//         state.error = action.payload;
//       }
//     });
//   },
// });

// export const { cleanWishlist } = wishlistSlice.actions;
// export default wishlistSlice.reducer;

import type { TLoading } from "@/types/loading";
import { createSlice } from "@reduxjs/toolkit";
import { actLikeToggle } from "./act/actLikeToggle";
import { actWishlist } from "./act/actWishlist";
import type { TProduct } from "@/types/product";
import { logout } from "../auth/authSlice";

type TWishlistState = {
  itemsId: number[];
  error: string | null;
  loading: TLoading;
  records: TProduct[];
};

const initialState: TWishlistState = {
  itemsId: [],
  error: null,
  loading: "idle",
  records: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    cleanWishlist: (state) => {
      state.records = [];
    },
  },

  //actLikeToggle
  extraReducers: (builder) => {
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      if (action.payload.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((id) => id !== action.payload.id);
        state.records = state.records.filter(
          (prod) => prod.id !== action.payload.id
        );
      }
    });
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    // actWishList

    builder.addCase(actWishlist.pending, (state) => {
      state.error = null;
      state.loading = "pending";
    });
    builder.addCase(actWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload.dataType === "productsFullInfo") {
        state.records = action.payload.data as TProduct[];
      } else if (action.payload.dataType === "productsIds") {
        state.itemsId = action.payload.data as number[];
      }
    });
    builder.addCase(actWishlist.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    builder.addCase(logout, (state) => {
      state.itemsId = [];
      state.records = [];
    });
  },
});

export const { cleanWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

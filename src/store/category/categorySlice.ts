import type { TCategory } from "@/types/category";
import type { TLoading } from "@/types/loading";
import { createSlice } from "@reduxjs/toolkit";
import { actCategory } from "./act/actCategory";

interface CategoryState {
  loading: TLoading;
  error: string | null;
  records: TCategory[];
}

const initialState: CategoryState = {
  loading: "idle",
  error: null,
  records: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actCategory.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actCategory.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actCategory.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export default categorySlice.reducer;

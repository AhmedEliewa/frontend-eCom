import type { RootState } from "@/store/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actPlaceOrder = createAsyncThunk(
  "order/actOrder",
  async (subTotal: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;

    const { auth, cart } = getState() as RootState;
    const orderItems = cart.records.map((item) => ({
      id: item.id,
      price: item.price,
      title: item.title,
      img: item.img,
      quantity: cart.items[item.id],
    }));

    try {
      const res = await axios.post("/orders", {
        userId: auth.user?.id,
        items: orderItems,
        subTotal,
      });
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

export default actPlaceOrder;

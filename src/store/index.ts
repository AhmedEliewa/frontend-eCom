import { configureStore } from "@reduxjs/toolkit";
import category from "@store/category/categorySlice";
import product from "@store/product/productSlice";
import cart from "@store/cart/cartSlice";
import wishlist from "@store/wishlist/wishlistSlice";
import auth from "@store/auth/authSlice";
import order from "@store/orders/orderSlice";
import { combineReducers } from "redux";
import {
  FLUSH,
  persistReducer,
  REGISTER,
  PAUSE,
  PERSIST,
  PURGE,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "user"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

const rootReducer = combineReducers({
  category,
  product,
  auth: persistReducer(authPersistConfig, auth),
  cart: persistReducer(cartPersistConfig, cart),
  wishlist,
  order,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

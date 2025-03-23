import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { persistReducer, persistStore } from "redux-persist";
import authSlice from "../slices/authSlice";
import productSlice from "../slices/productSlice";
import cartSlice from "../slices/cartSlice";

const persistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartSlice.reducer);

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice,
  product: productSlice.reducer,
  cart: persistedCartReducer, // Only persisting cart
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);

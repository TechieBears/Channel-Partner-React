import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import storageSlice from "./slices/storageSlice";
import masterSlice from "./Slices/masterSlice";
import loginSlice from "./Slices/loginSlice";
import userSlice from "./Slices/userSlice";
import deliverySlice from "./Slices/deliverySlice";
import VendorSlices from "./VendorSlices";

const reducers = combineReducers({
  user: loginSlice,
  storage: storageSlice,
  master: masterSlice,
  users: userSlice,
  vendor: VendorSlices,
  delivery: deliverySlice
});

const persistConfig = {
  key: "reeferon",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;

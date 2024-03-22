import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import masterSlice from "./Slices/masterSlice";
import loginSlice from "./Slices/loginSlice";
import userSlice from "./Slices/userSlice";
import deliverySlice from "./Slices/deliverySlice";
import VendorSlices from "./VendorSlices";
import SessionSlice from "./Slices/SessionSlice";
import orderSlice from "./Slices/orderSlice";
import restauantSlice from "./Slices/restauantSlice";

const reducers = combineReducers({
  user: loginSlice,
  master: masterSlice,
  users: userSlice,
  vendor: VendorSlices,
  delivery: deliverySlice,
  session: SessionSlice,
  orders: orderSlice,
  restaurants: restauantSlice,
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

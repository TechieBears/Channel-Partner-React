import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import storageSlice from "./slices/storageSlice";

const reducers = combineReducers({
  storage: storageSlice,
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

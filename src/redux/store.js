import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/slice.js";
import psychologistsReducer from "./psychologists/slice.js";
import favoritesReducer from "./favorites/slice.js";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};

const favoritesPersistConfig = {
  key: "favorites",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  favorites: persistReducer(favoritesPersistConfig, favoritesReducer),
  psychologists: psychologistsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';
import { persistConfig } from './reduxPersist';

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        thunk: false,
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type IRootReducer = typeof rootReducer;
export type IStore = typeof store;
export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = IStore['dispatch'];

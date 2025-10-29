import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import auth from './slices/auth'
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
  auth: auth,
  user: userSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: undefined,
  whitelist: ['auth', 'user'], // Whitelist the app reducer
  blacklist: [], // Blacklist other reducers like home
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import profileSlice from './slices/profileSlices';
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';
import modeSlices from './slices/modeSlices';

const reducers = combineReducers({
  profile: profileSlice,
  mode: modeSlices,
});

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whiteList: ['profile'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>; // useSelector 타입 지정.
export type AppDispatch = typeof store.dispatch;

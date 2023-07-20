import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';
import modeSlices from './slices/modeSlices';
import loginSlices from './slices/loginSlices';

const reducers = combineReducers({
  login: loginSlices,
  mode: modeSlices,
});

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whiteList: ['login', 'mode'],
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

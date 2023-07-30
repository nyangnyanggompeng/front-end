import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';
import modeSlices from './slices/modeSlices';
import loginSlices from './slices/loginSlices';
import userSlices from './slices/userSlices';

const reducers = combineReducers({
  login: loginSlices,
  mode: modeSlices,
  user: userSlices,
});

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  blacklist: ['user'], // user만 세션 스토리지 저장에서 제외
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

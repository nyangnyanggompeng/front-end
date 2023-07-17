import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './slices/profileSlices';

export const store = configureStore({
  reducer: {
    profile: profileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>; // useSelector 타입 지정.
export type AppDispatch = typeof store.dispatch;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = false;

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setIsLogin(_, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setIsLogin } = loginSlice.actions;
export default loginSlice.reducer;

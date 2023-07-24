import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = false;

const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    modeChange(_, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { modeChange } = modeSlice.actions;
export default modeSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDark: false,
};

const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    modeChange(state) {
      state.isDark = !state.isDark;
      console.log(state.isDark);
    },
  },
});

export const { modeChange } = modeSlice.actions;
export default modeSlice.reducer;

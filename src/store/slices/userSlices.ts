import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface userInfoType {
  id: number;
  username: string;
  domain: string;
  nickname: string;
}

const initialState: userInfoType = {
  id: 0,
  username: '',
  domain: '',
  nickname: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(_, action: PayloadAction<userInfoType>) {
      return action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;

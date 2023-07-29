import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface userInfoType {
  id: number;
  username: string;
  domain: string;
  nickname: string;
  profile: string;
}

const initialState: userInfoType = {
  id: 0,
  username: '',
  domain: '',
  nickname: '',
  profile: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(_, action: PayloadAction<userInfoType>) {
      return action.payload;
    },
    resetUserInfo() {
      return initialState;
    },
  },
});

export const { setUserInfo, resetUserInfo } = userSlice.actions;
export default userSlice.reducer;

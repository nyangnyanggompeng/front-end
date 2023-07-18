import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProfileType {
  id: number;
  isAdmin: boolean;
  username: string;
  domain: string;
  nickname: string;
  iat: number;
  exp: number;
}

interface ProfileState {
  data: ProfileType;
}

const initialState: ProfileState = {
  data: {
    id: 0,
    isAdmin: false,
    username: '',
    domain: '',
    nickname: '',
    iat: 0,
    exp: 0,
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getUser(state, action: PayloadAction<ProfileType>) {
      state.data = action.payload;
    },
    editUser(state, action: PayloadAction<ProfileType>) {
      state.data = { ...state.data, ...action.payload };
    },
    resetUser(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { getUser, editUser, resetUser } = profileSlice.actions;
export default profileSlice.reducer;

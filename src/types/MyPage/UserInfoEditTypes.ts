import { ServerError } from '../SignUp/common';

export type UserInfoEditRequestType = {
  nickname: string;
  image: File | null;
};

export const UserInfoEditStatus = [
  'UPDATE_INFO_SUCCESS',
  'UPDATE_INFO_FAILURE',
  'NICKNAME_OR_PROFILE_NOT_ENTERED',
  'NO_EXISTING_USER',
  'INVALID_USER',
  ServerError,
] as const;

export type UserInfoEditStatusType = (typeof UserInfoEditStatus)[number];

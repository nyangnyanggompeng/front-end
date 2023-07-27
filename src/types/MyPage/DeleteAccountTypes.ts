import { ServerError } from '../SignUp/common';

export type DeleteAccountRequestType = {
  password: string;
};

export const DeleteAccountStatus = [
  'DELETE_USER_SUCCESS',
  'DELETE_USER_FAILURE',
  'PASSWORD_NOT_ENTERED',
  'INVALID_PASSWORD',
  'UNAUTHORIZED',
  ServerError,
] as const;

export type DeleteAccountStatusType = (typeof DeleteAccountStatus)[number];

import { ServerError } from '../SignUp/common';

export type ChangePasswordRequestType = {
  currentPassword: string;
  password: string;
  passwordVerify: string;
};

export const ChangePasswordStatus = [
  'RESET_PASSWORD_SUCCESS',
  'RESET_PASSWORD_FAILURE',
  'PASSWORD_OR_PASSWORD_VERIFY_NOT_ENTERED',
  'PASSWORD_NOT_MATCHED',
  'INVALID_CURRENT_PASSWORD',
  'CURRENT_USING_PASSWORD',
  'INVALID_FORM',
  ServerError,
] as const;

export type ChangePasswordStatusType = (typeof ChangePasswordStatus)[number];

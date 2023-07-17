import { ServerError } from './common';

export const SignupStatus = [
  'USER_CREATED',
  'EMAIL_ALREADY_EXISTS',
  'NICKNAME_ALREADY_EXISTS',
  'INVALID_PASSWORD',
  'WRONG_PASSWORD',
  'EMAIL_OR_PASSWORD_OR_NICKNAME_NO_ENTERED',
  ServerError,
] as const;

export type SignupStatusType = (typeof SignupStatus)[number];

export type SignupFormType = {
  username: string;
  domain: string;
  password: string;
  passwordVerify: string;
  nickname: string;
};

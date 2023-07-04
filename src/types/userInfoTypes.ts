export const ServerError = 'INTERNAL_SERVER_ERROR';
export type ServerErrorType = typeof ServerError;

export const EmailCheckStatus = [
  'AVAILABLE_EMAIL',
  'EMAIL_ALREADY_EXISTS',
  'EMAIL_NO_ENTERED',
  ServerError,
] as const;
export type EmailCheckStatusType = (typeof EmailCheckStatus)[number];

export type PasswordCheckStatus =
  | 'OK'
  | 'INVALID_LENGTH'
  | 'INVALID_CHARACTER'
  | 'NOT_MATCHED'
  | 'MATCHED';

export const NicknameCheckStatus = [
  'AVAILABLE_NICKNAME',
  'NICKNAME_ALREADY_EXISTS',
  'NICKNAME_NO_ENTERED',
  ServerError,
] as const;
export type NicknameCheckStatusType = (typeof NicknameCheckStatus)[number];

export const SignupStatus = [
  'USER_CREATED',
  'EMAIL_ALREADY_EXISTS',
  'NICKNAME_ALREADY_EXISTS',
  'INVALID_PASSWORD',
  'WRONG_PASSWORD',
  'NICKNAME_NO_ENTERED',
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
export type EmailCheckRequestType = {
  username: string;
  domain: string;
};
export type NicknameCheckRequestType = {
  nickname: string;
};

// TODO : 회원가입 api 구현 완료되면 업데이트 필요함
type ServerErrorType = 'INTERNAL_SERVER_ERROR';
export type EmailCheckStatus = 'OK' | 'DUPLICATED' | ServerErrorType;
export type PasswordCheckStatus =
  | 'OK'
  | 'INVALID_LENGTH'
  | 'INVALID_CHARACTER'
  | 'NOT_MATCHED'
  | 'MATCHED';
export type NicknameCheckStatus = 'OK' | 'DUPLICATED' | ServerErrorType;
// TODO : 논의 필요함
export type signupStatusType =
  | 'USER_CREATED'
  | 'EMAIL_ALREADY_EXISTS'
  | 'NICKNAME_ALREADY_EXISTS'
  | 'INVALID_PASSWORD'
  | 'WRONG_PASSWORD'
  | 'NICKNAME_NO_ENTERED'
  | 'EMAIL_OR_PASSWORD_OR_NICKNAME_NO_ENTERED'
  | ServerErrorType;
export type signupFormType = {
  username: string;
  domain: string;
  password: string;
  passwordVerify: string;
  nickname: string;
};
export type emailCheckRequestType = {
  email: string;
  domain: string;
};
export type nicknameCheckRequestType = {
  nickname: string;
};

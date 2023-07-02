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
  | 'OK'
  | 'DUPLICATED_EMAIL'
  | 'PASSWORD_NOT_MATCHED'
  | 'INVALID_NICKNAME'
  | ServerErrorType;
export type signupFormType = {
  email: string;
  domain: string;
  password: string;
  password2: string;
  nickname: string;
};
export type emailCheckRequestType = {
  email: string;
  domain: string;
};
export type nicknameCheckRequestType = {
  nickname: string;
};

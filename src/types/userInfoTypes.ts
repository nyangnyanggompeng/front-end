// TODO : 회원가입 api 구현 완료되면 업데이트 필요함
export type EmailCheckStatus = 'OK' | 'DUPLICATED' | 'INVALID';
export type PasswordCheckStatus =
  | 'OK'
  | 'INVALID_LENGTH'
  | 'INVALID_CHARACTER'
  | 'NOT_MATCHED'
  | 'MATCHED';
export type NicknameCheckStatus = 'OK' | 'DUPLICATED' | 'INVALID';

export type signupFormType = {
  email: string;
  domain: string;
  password: string;
  password2: string;
  nickname: string;
};

// TODO : 논의 필요함
export type signupStatusType =
  | 'OK'
  | 'DUPLICATED_EMAIL'
  | 'PASSWORD_NOT_MATCHED'
  | 'INVALID_NICKNAME'
  | 'INTERNAL_SERVER_ERROR';

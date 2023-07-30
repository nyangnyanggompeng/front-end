// TODO : 회원가입 api 구현 완료되면 업데이트 필요함
export type EmailCheckStatus = 'OK' | 'DUPLICATED' | 'INVALID';
export type PasswordCheckStatus =
  | 'OK'
  | 'INVALID_LENGTH'
  | 'INVALID_CHARACTER'
  | 'NOT_MATCHED'
  | 'MATCHED';
export type NicknameCheckStatus = 'OK' | 'DUPLICATED' | 'INVALID';

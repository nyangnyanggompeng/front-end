export type EmailCheckStatus = 'OK' | 'DUPLICATED' | 'INVALID';
export type PasswordCheckStatus =
  | 'OK'
  | 'INVALID_LENGTH'
  | 'INVALID_CHARACTER'
  | 'NOT_MATCHED'
  | 'MATCHED';
export type NicknameCheckStatus = 'OK' | 'DUPLICATED' | 'INVALID';

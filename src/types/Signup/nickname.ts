import { ServerError } from './common';

export const NicknameStatus = [
  'AVAILABLE_NICKNAME',
  'NICKNAME_ALREADY_EXISTS',
  'NICKNAME_NO_ENTERED',
  ServerError,
] as const;

export type NicknameStatusType = (typeof NicknameStatus)[number];

export type NicknameRequestType = {
  nickname: string;
};

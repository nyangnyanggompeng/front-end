import { ServerError } from './common';

export const EmailStatus = [
  'AVAILABLE_EMAIL',
  'EMAIL_ALREADY_EXISTS',
  'EMAIL_NO_ENTERED',
  ServerError,
] as const;

export type EmailStatusType = (typeof EmailStatus)[number];

export type EmailRequestType = {
  username: string;
  domain: string;
};

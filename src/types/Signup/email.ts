import { ServerError } from './common';

export const EmailStatus = [
  'AVAILABLE_EMAIL',
  'AUTHENTICATION_FAILURE',
  'EMAIL_ALREADY_EXISTS',
  'DELETED_USER',
  'AUTHENTICATION_NUMBER_NOT_ENTERED',
  ServerError,
] as const;

export type EmailStatusType = (typeof EmailStatus)[number];

export type EmailRequestType = {
  username: string;
  domain: string;
};

export const EmailSendStatus = [
  'MAIL_SEND_SUCCESS',
  'MAIL_SEND_FAILURE',
  'EMAIL_NOT_ENTERED',
  ServerError,
] as const;

export function EmailStatusTypeChecker(status: unknown) {
  if (typeof status !== 'string') return false;
  return EmailStatus.includes(status as EmailStatusType);
}

export type EmailSendStatusType = (typeof EmailSendStatus)[number];

export type EmailVerifyRequestType = {
  authNum: string;
};

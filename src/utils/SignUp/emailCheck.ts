import axios, { isAxiosError } from 'axios';
import { EmailRequestType } from '../../types/SignUp';
import {
  EmailStatusType,
  EmailSendStatusType,
  EmailVerifyRequestType,
  EmailStatusTypeChecker,
} from '../../types/SignUp/email';

export async function requestCheckMail(
  request: EmailRequestType
): Promise<EmailSendStatusType> {
  try {
    await axios.post('/register/send_email', request);
    return 'MAIL_SEND_SUCCESS';
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      const errorCode = error.response.status;
      switch (errorCode) {
        case 400:
          return 'EMAIL_NOT_ENTERED';
        case 500:
          return 'MAIL_SEND_FAILURE';
        default:
          return 'INTERNAL_SERVER_ERROR';
      }
    }
    return 'INTERNAL_SERVER_ERROR';
  }
}

export async function emailCheck(
  request: EmailVerifyRequestType
): Promise<EmailStatusType> {
  try {
    await axios.post('/register/email_check', request);
    return 'AVAILABLE_EMAIL';
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      const errorCode = error.response.data;
      if (EmailStatusTypeChecker(errorCode)) {
        return errorCode as EmailStatusType;
      }
      return 'INTERNAL_SERVER_ERROR';
    }
    return 'INTERNAL_SERVER_ERROR';
  }
}

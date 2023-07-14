import axios, { isAxiosError } from 'axios';
import {
  EmailRequestType,
  EmailStatus,
  EmailStatusType,
} from '../../types/Signup/email';

function EmailStatusTypeChecker(status: unknown) {
  if (typeof status !== 'string') return false;
  return EmailStatus.includes(status as EmailStatusType);
}

export async function emailCheck(
  request: EmailRequestType
): Promise<EmailStatusType> {
  try {
    await axios.post('/register/idcheck', request);
    return 'AVAILABLE_EMAIL';
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      const errorCode = error.response.data;
      if (EmailStatusTypeChecker(errorCode))
        return errorCode as EmailStatusType;
      else return 'INTERNAL_SERVER_ERROR';
    }
    return 'INTERNAL_SERVER_ERROR';
  }
}

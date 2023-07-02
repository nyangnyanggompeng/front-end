import axios, { isAxiosError } from 'axios';
import {
  signupFormType,
  signupStatusType,
  EmailCheckStatus,
  emailCheckRequestType,
} from '../types/userInfoTypes';

// TODO : 논의 필요
// TODO : 확장성을 고려할 것.
function signupStatusTypeChecker(status: string) {
  switch (status) {
    case 'OK':
      return true;
    case 'DUPLICATED_EMAIL':
      return true;
    case 'PASSWORD_NOT_MATCHED':
      return true;
    case 'INVALID_NICKNAME':
      return true;
    case 'INTERNAL_SERVER_ERROR':
      return true;
    default:
      return false;
  }
}

export async function signup(
  signupForm: signupFormType
): Promise<signupStatusType> {
  try {
    await axios.post('/register/register_process', signupForm);
    return 'OK';
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      const { errorCode } = error.response.data;
      if (signupStatusTypeChecker(errorCode))
        return errorCode as signupStatusType;
      else return 'INTERNAL_SERVER_ERROR';
    }
    return 'INTERNAL_SERVER_ERROR';
  }
}

// TODO : api 명세 다시 확인 필요함.
export async function emailCheck(
  request: emailCheckRequestType
): Promise<EmailCheckStatus> {
  try {
    await axios.post('/register/idcheck', request);
    return 'OK';
  } catch (error: unknown) {
    if (isAxiosError(error) && error.status === 400) return 'DUPLICATED';
    return 'INTERNAL_SERVER_ERROR';
  }
}

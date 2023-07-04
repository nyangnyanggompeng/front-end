import axios, { isAxiosError } from 'axios';
import {
  signupFormType,
  signupStatusType,
  EmailCheckStatus,
  emailCheckRequestType,
  NicknameCheckStatus,
  nicknameCheckRequestType,
} from '../types/userInfoTypes';

// TODO : 논의 필요
// TODO : 확장성을 고려할 것.
function signupStatusTypeChecker(status: string) {
  switch (status) {
    case 'USER_CREATED':
      return true;
    case 'EMAIL_ALREADY_EXISTS':
      return true;
    case 'NICKNAME_ALREADY_EXISTS':
      return true;
    case 'INVALID_PASSWORD':
      return true;
    case 'WRONG_PASSWORD':
      return true;
    case 'NICKNAME_NO_ENTERED':
      return true;
    case 'EMAIL_OR_PASSWORD_OR_NICKNAME_NO_ENTERED':
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
    return 'USER_CREATED';
  } catch (error: unknown) {
    console.log(error);
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

// TODO : api 명세 다시 확인 필요함.
export async function nicknameCheck(
  request: nicknameCheckRequestType
): Promise<NicknameCheckStatus> {
  try {
    await axios.post('/register/nicknamecheck', request);
    return 'OK';
  } catch (error: unknown) {
    if (isAxiosError(error) && error.status === 400) return 'DUPLICATED';
    return 'INTERNAL_SERVER_ERROR';
  }
}

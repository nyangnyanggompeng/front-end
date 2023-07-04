import axios, { isAxiosError } from 'axios';
import {
  SignupFormType,
  SignupStatus,
  SignupStatusType,
  EmailCheckStatus,
  EmailCheckStatusType,
  EmailCheckRequestType,
  NicknameCheckStatus,
  NicknameCheckStatusType,
  NicknameCheckRequestType,
} from '../types/userInfoTypes';

function SignupStatusTypeChecker(status: unknown) {
  if (typeof status !== 'string') return false;
  return SignupStatus.includes(status as SignupStatusType);
}

function EmailCheckStatusTypeChecker(status: unknown) {
  if (typeof status !== 'string') return false;
  return EmailCheckStatus.includes(status as EmailCheckStatusType);
}

export async function signup(
  signupForm: SignupFormType
): Promise<SignupStatusType> {
  try {
    await axios.post('/register/register_process', signupForm);
    return 'USER_CREATED';
  } catch (error: unknown) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      const errorCode = error.response.data;
      if (SignupStatusTypeChecker(errorCode))
        return errorCode as SignupStatusType;
      else return 'INTERNAL_SERVER_ERROR';
    }
    return 'INTERNAL_SERVER_ERROR';
  }
}

export async function emailCheck(
  request: EmailCheckRequestType
): Promise<EmailCheckStatusType> {
  try {
    await axios.post('/register/idcheck', request);
    return 'AVAILABLE_EMAIL';
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      const errorCode = error.response.data;
      if (EmailCheckStatusTypeChecker(errorCode))
        return errorCode as EmailCheckStatusType;
      else return 'INTERNAL_SERVER_ERROR';
    }
    return 'INTERNAL_SERVER_ERROR';
  }
}

// TODO : api 명세 다시 확인 필요함.
export async function nicknameCheck(
  request: NicknameCheckRequestType
): Promise<NicknameCheckStatusType> {
  try {
    await axios.post('/register/nickname_check', request);
    return 'AVAILABLE_NICKNAME';
  } catch (error: unknown) {
    if (isAxiosError(error) && error.status === 400)
      return 'NICKNAME_ALREADY_EXISTS';
    return 'INTERNAL_SERVER_ERROR';
  }
}

import axios, { isAxiosError } from 'axios';
import {
  SignupFormType,
  SignupStatus,
  SignupStatusType,
  EmailStatus,
  EmailStatusType,
  EmailRequestType,
  NicknameStatus,
  NicknameStatusType,
  NicknameRequestType,
} from '../types/SignUp/userInfoTypes';

function SignupStatusTypeChecker(status: unknown) {
  if (typeof status !== 'string') return false;
  return SignupStatus.includes(status as SignupStatusType);
}

function EmailStatusTypeChecker(status: unknown) {
  if (typeof status !== 'string') return false;
  return EmailStatus.includes(status as EmailStatusType);
}

function NicknameStatusTypeChecker(status: unknown) {
  if (typeof status !== 'string') return false;
  return NicknameStatus.includes(status as NicknameStatusType);
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

export async function nicknameCheck(
  request: NicknameRequestType
): Promise<NicknameStatusType> {
  try {
    await axios.post('/register/nickname_check', request);
    return 'AVAILABLE_NICKNAME';
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      const errorCode = error.response.data;
      if (NicknameStatusTypeChecker(errorCode))
        return errorCode as NicknameStatusType;
      return 'INTERNAL_SERVER_ERROR';
    }
    return 'INTERNAL_SERVER_ERROR';
  }
}

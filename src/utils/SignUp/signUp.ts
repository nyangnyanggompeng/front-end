import axios, { isAxiosError } from 'axios';
import {
  SignupFormType,
  SignupStatus,
  SignupStatusType,
} from '../../types/SignUp';

function SignupStatusTypeChecker(status: unknown) {
  if (typeof status !== 'string') return false;
  return SignupStatus.includes(status as SignupStatusType);
}

export async function signup(
  signupForm: SignupFormType
): Promise<SignupStatusType> {
  try {
    await axios.post('/register/register_process', signupForm);
    return 'USER_CREATED';
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      const errorCode = error.response.data;
      if (SignupStatusTypeChecker(errorCode))
        return errorCode as SignupStatusType;
      else return 'INTERNAL_SERVER_ERROR';
    }
    return 'INTERNAL_SERVER_ERROR';
  }
}

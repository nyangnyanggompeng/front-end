import axios, { isAxiosError } from 'axios';
import {
  NicknameRequestType,
  NicknameStatus,
  NicknameStatusType,
} from '../../types/Signup/nickname';

function NicknameStatusTypeChecker(status: unknown) {
  if (typeof status !== 'string') return false;
  return NicknameStatus.includes(status as NicknameStatusType);
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

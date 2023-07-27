import axios, { isAxiosError } from 'axios';
import {
  ChangePasswordRequestType,
  ChangePasswordStatus,
  ChangePasswordStatusType,
} from '../../types/MyPage/ChangePasswordTypes';

export function ChangePasswordStatusTypeChecker(status: unknown) {
  if (typeof status !== 'string') return false;
  return ChangePasswordStatus.includes(
    status as (typeof ChangePasswordStatus)[number]
  );
}

export async function changePassword(
  req: ChangePasswordRequestType
): Promise<ChangePasswordStatusType> {
  try {
    await axios.patch('/mypage/users/reset_password', req);
    return 'RESET_PASSWORD_SUCCESS';
  } catch (e: unknown) {
    if (isAxiosError(e) && e.response) {
      const { status, data } = e.response;
      if (status === 400) {
        if (ChangePasswordStatusTypeChecker(data))
          throw new Error(data as ChangePasswordStatusType);
        throw new Error('INTERNAL_SERVER_ERROR');
      }
      throw new Error('INTERNAL_SERVER_ERROR');
    }
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}

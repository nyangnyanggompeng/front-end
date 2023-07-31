import axios, { isAxiosError } from 'axios';
import {
  UserInfoEditRequestType,
  UserInfoEditStatus,
  UserInfoEditStatusType,
} from '../../types/MyPage/UserInfoEditTypes';

export function UserInfoEditStatusTypeChecker(status: unknown) {
  if (typeof status !== 'string') return false;
  return UserInfoEditStatus.includes(status as UserInfoEditStatusType);
}

export async function updateUserInfo(
  req: UserInfoEditRequestType
): Promise<UserInfoEditStatusType> {
  try {
    await axios({
      method: 'patch',
      url: '/mypage/users',
      data: req,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return 'UPDATE_INFO_SUCCESS';
  } catch (e: unknown) {
    if (isAxiosError(e) && e.response) {
      const { status, data } = e.response;
      if (status === 400) {
        if (UserInfoEditStatusTypeChecker(data))
          throw new Error(data as UserInfoEditStatusType);
        throw new Error('INTERNAL_SERVER_ERROR');
      }
      throw new Error('INTERNAL_SERVER_ERROR');
    }
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}

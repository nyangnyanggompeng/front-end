import axios, { isAxiosError } from 'axios';
import {
  DeleteAccountRequestType,
  DeleteAccountStatus,
  DeleteAccountStatusType,
} from '../../types/MyPage/DeleteAccountTypes';

export function DeleteAccountStatusTypeChecker(status: unknown) {
  if (typeof status !== 'string') return false;
  return DeleteAccountStatus.includes(status as DeleteAccountStatusType);
}

export async function deleteAccount(
  req: DeleteAccountRequestType
): Promise<DeleteAccountStatusType> {
  try {
    await axios.put('/mypage/users', req);
    return 'DELETE_USER_SUCCESS';
  } catch (e: unknown) {
    if (isAxiosError(e) && e.response) {
      const { status, data } = e.response;
      if (status === 400) {
        if (DeleteAccountStatusTypeChecker(data))
          throw new Error(data as DeleteAccountStatusType);
        throw new Error('INTERNAL_SERVER_ERROR');
      }
      if (status === 401) {
        throw new Error('UNAUTHORIZED');
      }
      throw new Error('INTERNAL_SERVER_ERROR');
    }
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}

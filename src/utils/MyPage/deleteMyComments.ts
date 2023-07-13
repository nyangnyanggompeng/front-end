import axios, { isAxiosError } from 'axios';
import { DeleteMyCommentRequestType } from '../../types/MyPage/MyCommentTypes';

export async function deleteMyComments(req: DeleteMyCommentRequestType) {
  try {
    await axios.put('/mypage/comments', req);
    return;
  } catch (e: unknown) {
    if (isAxiosError(e) && e.response) {
      const { status } = e.response;
      if (status === 400) throw new Error('BAD_REQUEST');
      throw new Error('INTERNAL_SERVER_ERROR');
    }
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}

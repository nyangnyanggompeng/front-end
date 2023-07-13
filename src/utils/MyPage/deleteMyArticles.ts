import axios, { isAxiosError } from 'axios';
import { DeleteMyArticleRequestType } from '../../types/MyPage/MyArticleTypes';

export async function deleteMyArticles(req: DeleteMyArticleRequestType) {
  try {
    await axios.put('/mypage/posts', req);
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

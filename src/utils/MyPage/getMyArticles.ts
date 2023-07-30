import axios from 'axios';
import { myArticlesDataType } from '../../types/MyPage/MyArticleTypes';

export async function getMyArticles(
  currentPage: number
): Promise<myArticlesDataType> {
  try {
    const res = await axios.get(`/mypage/posts/${currentPage}`);
    if (res.data) return res.data;
    throw new Error('INTERNAL_SERVER_ERROR');
  } catch {
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}

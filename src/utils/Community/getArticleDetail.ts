import axios from 'axios';
import { ArticleDetailType } from '../../types/Community/articleTypes';

export async function getArticleDetail(
  postId: number
): Promise<ArticleDetailType> {
  try {
    const res = await axios.get('/board/posts/{postId}');
    if (res.data) return res.data;
    throw new Error('INTERNAL_SERVER_ERROR');
  } catch {
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}

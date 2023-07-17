import axios from 'axios';
import { ArticleDataType } from '../../types/Community/articleTypes';

export async function getArticles(
  currentPage: number
): Promise<ArticleDataType> {
  try {
    const res = await axios.get(`/board/${currentPage}`);
    if (res.data) return res.data;
    throw new Error('INTERNAL_SERVER_ERROR');
  } catch {
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}

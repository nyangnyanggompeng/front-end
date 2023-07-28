import axios, { isAxiosError } from 'axios';
import { ArticleDataType } from '../../types/Community/articleTypes';

export async function getArticles(
  currentPage: number
): Promise<ArticleDataType> {
  try {
    const res = await axios.get(`/board/${currentPage}`);
    if (res.data) return res.data;
    throw new Error('INTERNAL_SERVER_ERROR');
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error('INTERNAL_SERVER_ERROR');
    }
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}

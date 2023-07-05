import axios from 'axios';
import { ArticleType } from '../../types/Community/communityTypes';

export async function getArticles(currentPage: number): Promise<ArticleType[]> {
  try {
    const res = await axios.get(`/board/${currentPage}`);
    if (res.data) return res.data;
    throw new Error('INTERNAL_SERVER_ERROR');
  } catch {
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}

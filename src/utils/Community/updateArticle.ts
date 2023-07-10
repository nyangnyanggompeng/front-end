import axios, { isAxiosError } from 'axios';
import { ArticleWriteType } from '../../types/Community/articleTypes';

export async function updateArticle(
  article: ArticleWriteType,
  articleId: number
) {
  try {
    await axios.patch(`/board/${articleId}`, article);
    return;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      switch (error.status) {
        case 400:
          throw new Error('BAD_REQUEST');
        default:
          throw new Error('INTERNAL_SERVER_ERROR');
      }
    }
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}

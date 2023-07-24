import axios, { isAxiosError } from 'axios';
import {
  ArticleWriteType,
  ArticleWriteStateType,
} from '../../types/Community/articleTypes';

export async function postArticle(
  newArticle: ArticleWriteType
): Promise<ArticleWriteStateType> {
  try {
    await axios.post(`/board`, newArticle);
    return 'OK';
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      switch (error.response?.status) {
        case 400:
          return 'BAD_REQUEST';
        case 500:
          return 'INTERNAL_SERVER_ERROR';
        default:
          return 'INTERNAL_SERVER_ERROR';
      }
    }
    return 'INTERNAL_SERVER_ERROR';
  }
}

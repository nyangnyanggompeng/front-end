import axios, { isAxiosError } from 'axios';
import {
  ArticleType,
  WritingStatusType,
} from '../../types/Community/writingTypes';

export async function postArticle(
  newArticle: ArticleType
): Promise<WritingStatusType> {
  try {
    await axios.post('/board/1', newArticle);
    return 'SUCCESS';
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      switch (error.status) {
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

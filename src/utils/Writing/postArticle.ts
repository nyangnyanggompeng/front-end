import axios, { isAxiosError } from 'axios';
import {
  ArticleWriteType,
  ArticleWriteStateType,
} from '../../types/Community/articleTypes';

export async function postArticle(
  newArticle: ArticleWriteType
): Promise<ArticleWriteStateType> {
  // ANCHOR : 테스트 유저 id, [8, 9, 10]
  const user_id = 17;
  try {
    await axios.post(`/board/${user_id}`, newArticle);
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

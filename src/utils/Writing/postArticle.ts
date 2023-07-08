import axios, { isAxiosError } from 'axios';
import {
  ArticleType,
  WritingStatusType,
} from '../../types/Community/writingTypes';

export async function postArticle(
  newArticle: ArticleType
): Promise<WritingStatusType> {
  // TODO : 현재 로그인한 유저의 Id, 임시로 넣은 것이므로 추후 삭제 필요함.
  const user_id = 1;
  try {
    await axios.post(`/board/${user_id}`, newArticle);
    return 'SUCCESS';
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

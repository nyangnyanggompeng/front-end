import axios from 'axios';
import { MyCommentDataType } from '../../types/MyPage/MyCommentTypes';

export async function getMyComments(
  currentPage: number
): Promise<MyCommentDataType> {
  try {
    const res = await axios.get(`/mypage/comments/${currentPage}`);
    if (res.data) return res.data;
    throw new Error('INTERNAL_SERVER_ERROR');
  } catch {
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}

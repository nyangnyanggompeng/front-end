import axios from 'axios';
import { MyCommentDataType } from '../../types/MyPage/MyCommentTypes';

// ANCHOR : 테스트 유저 id, 기본적인 테스트는 17로 진행함
const userId = 17;

export async function getMyComments(
  currentPage: number
): Promise<MyCommentDataType> {
  try {
    const res = await axios.get(`/mypage/${userId}/comments/${currentPage}`);
    if (res.data) return res.data;
    throw new Error('INTERNAL_SERVER_ERROR');
  } catch {
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}

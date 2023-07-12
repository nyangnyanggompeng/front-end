import axios from 'axios';
import { BookMarkData } from '../../types/MyPage/BookMarkTypes';

// ANCHOR : 테스트 유저 id, 기본적인 테스트는 17로 진행함
const userId = 17;

export default async function getBookMark(
  currentPage: number
): Promise<BookMarkData> {
  try {
    const res = await axios.get(`/mypage/bookmark/${userId}/${currentPage}`);
    if (res.data) return res.data;
    throw new Error('INTERNAL_SERVER_ERROR');
  } catch {
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}

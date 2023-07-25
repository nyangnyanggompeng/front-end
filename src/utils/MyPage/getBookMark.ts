import axios from 'axios';
import { BookMarkData } from '../../types/MyPage/BookMarkTypes';

export default async function getBookMark(
  currentPage: number
): Promise<BookMarkData> {
  try {
    const res = await axios.get(`/mypage/set/bookmark/${currentPage}`);
    if (res.data) return res.data;
    throw new Error('INTERNAL_SERVER_ERROR');
  } catch {
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}

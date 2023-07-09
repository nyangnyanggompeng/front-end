import axios from 'axios';
import { CommentDataType } from '../../types/Community/commentTypes';

export async function getComments(
  pageNum: number,
  postId: number
): Promise<CommentDataType> {
  try {
    const res = await axios.get(`/board/${postId}/comments/${pageNum}`);
    if (res.data) return res.data;
    throw new Error('INTERNAL_SERVER_ERROR');
  } catch {
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}

import axios from 'axios';
import { CommentWriteType } from '../../types/Community/commentTypes';

export async function updateComments(
  postId: number,
  commentId: number,
  body: CommentWriteType
) {
  try {
    await axios.patch(`/board/${postId}/comments/${commentId}`, body);
    return;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      throw new Error('CONTENT_NO_ENTERED');
    }
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}

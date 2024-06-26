import axios from 'axios';

export async function deleteComments(postId: number, commentId: number) {
  try {
    await axios.put(`/board/${postId}/comments/${commentId}`);
    return;
  } catch (error: unknown) {
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}

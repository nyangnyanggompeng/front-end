import axios from 'axios';

export async function deleteArticle(postId: string | undefined) {
  try {
    if (postId === undefined) throw new Error('POST_ID_IS_UNDEFINED');
    await axios.put(`/board/${postId}`);
    return;
  } catch (error: unknown) {
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}

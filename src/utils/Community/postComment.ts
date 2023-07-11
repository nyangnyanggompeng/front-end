import axios, { isAxiosError } from 'axios';
import { CommentWriteType } from '../../types/Community/commentTypes';

export async function postComment(
  commentForm: CommentWriteType,
  postId: number
) {
  // ANCHOR : 테스트 유저 id, [8, 9, 10]
  const user_id = 17;
  try {
    await axios.post(`/board/${postId}/comments/${user_id}`, commentForm);
    return;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      switch (error.status) {
        case 400:
          alert('입력된 값이 없습니다.');
          break;
        default:
          alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
      }
    }
    alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
  }
}

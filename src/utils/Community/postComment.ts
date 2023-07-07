import axios, { isAxiosError } from 'axios';
import { CommentWriteType } from '../../types/Community/commentTypes';

export async function postComment(
  commentForm: CommentWriteType,
  postId: number
) {
  // TODO : 임시로 추가한 로그인 유저 id. 이후에 삭제 예정
  const user_id = 1;
  try {
    await axios.post(`/board/${postId}/comment/${user_id}`, commentForm);
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

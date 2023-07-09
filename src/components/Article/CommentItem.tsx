import { useQueryClient } from '@tanstack/react-query';
import { CommentType } from '../../types/Community/commentTypes';
import { getDate } from '../../utils/Common/getDate';
import { deleteComments } from '../../utils/Community/deleteComments';

type CommentItemProps = {
  comment: CommentType;
  postId: number;
};

export default function CommentItem({ comment, postId }: CommentItemProps) {
  // TODO : 현재 로그인된 유저의 id가 필요함.
  const currentUserId = 10;
  const queryClient = useQueryClient();
  function onDeleteHander(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    deleteComments(postId, comment.id)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['comments'] });
        alert('댓글 삭제에 성공했습니다.');
      })
      .catch(() => {
        alert('댓글 삭제에 실패했습니다.');
      });
  }

  return (
    <li>
      <div>{comment.writer}</div>
      <div>{getDate(new Date(comment.createdAt))}</div>
      {currentUserId === comment.userId && (
        <div>
          <button>수정</button>
          <button onClick={onDeleteHander}>삭제</button>
        </div>
      )}
      <div>{comment.content}</div>
    </li>
  );
}

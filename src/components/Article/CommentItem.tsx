import { useQueryClient } from '@tanstack/react-query';
import { CommentType } from '../../types/Community/commentTypes';
import { getDate } from '../../utils/Common/getDate';
import { deleteComments } from '../../utils/Community/deleteComments';
import { useState } from 'react';

type CommentItemProps = {
  comment: CommentType;
  postId: number;
};

export default function CommentItem({ comment, postId }: CommentItemProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
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

  function onEditHander(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newComment = formData.get('newComment') as string;
    if (!newComment) {
      alert('댓글을 작성해주세요.');
      return;
    }
    // TODO : 수정된 댓글을 서버에 보내는 함수 필요함.
    setIsEdit(false);
  }

  return (
    <li>
      <div>{comment.writer}</div>
      <div>{getDate(new Date(comment.createdAt))}</div>
      {currentUserId === comment.userId && (
        <div>
          <button onClick={() => setIsEdit(true)}>수정</button>
          <button onClick={onDeleteHander}>삭제</button>
        </div>
      )}
      {isEdit ? (
        <form onSubmit={onEditHander}>
          <input></input>
          <button>작성 완료</button>
          <button onClick={() => setIsEdit(false)}>수정 취소</button>
        </form>
      ) : (
        <div>{comment.content}</div>
      )}
    </li>
  );
}

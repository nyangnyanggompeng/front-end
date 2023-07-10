import { useQueryClient } from '@tanstack/react-query';
import {
  CommentStatusType,
  CommentType,
  CommentWriteType,
} from '../../types/Community/commentTypes';
import { getDate } from '../../utils/Common/getDate';
import { deleteComments } from '../../utils/Community/deleteComments';
import { useState } from 'react';
import { updateComments } from '../../utils/Community/updateComments';

type CommentItemProps = {
  comment: CommentType;
  postId: number;
};

const statusMessage: Record<CommentStatusType, string> = {
  UPDATE_COMMENT_SUCCESS: '댓글 삭제에 성공했습니다.',
  INTERNAL_SERVER_ERROR: '댓글 삭제에 실패했습니다.',
  CONTENT_NO_ENTERED: '수정할 댓글을 작성해주세요.',
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
        alert(statusMessage['UPDATE_COMMENT_SUCCESS']);
      })
      .catch((e: CommentStatusType) => {
        alert(statusMessage[e]);
      });
  }

  function onEditHander(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newComment = formData.get('newComment') as string;
    if (!newComment) {
      alert('수정할 댓글을 작성해주세요.');
      return;
    }
    const commentForm: CommentWriteType = {
      content: newComment,
    };
    updateComments(postId, comment.id, commentForm)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['comments'] });
        alert('댓글 수정에 성공했습니다.');
      })
      .catch(() => {
        alert('댓글 수정에 실패했습니다.');
      });
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
          <input name='newComment' />
          <button type='submit'>작성 완료</button>
          <button onClick={() => setIsEdit(false)}>수정 취소</button>
        </form>
      ) : (
        <div>{comment.content}</div>
      )}
    </li>
  );
}

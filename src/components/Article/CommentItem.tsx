import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import {
  CommentStatusType,
  CommentType,
  CommentWriteType,
} from '../../types/Community/commentTypes';
import { getDate } from '../../utils/Common/getDate';
import { deleteComments } from '../../utils/Community/deleteComments';
import { updateComments } from '../../utils/Community/updateComments';
import { useUser } from '../../hooks/Common';
import { CommentItemStyle } from '../../styles/Community';
import { CommentButtons } from '.';

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
  const theme = useTheme();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const currentUserId = useUser().userInfo?.id;
  const queryClient = useQueryClient();
  function deleteHander() {
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
    <li css={CommentItemStyle(theme)}>
      <div className='writer'>{comment.writer}</div>
      <div className='date'>{getDate(new Date(comment.createdAt))}</div>
      <CommentButtons
        isEdit={isEdit}
        currentUserId={currentUserId}
        commentUserId={comment.userId}
        setIsEdit={setIsEdit}
        deleteFunction={deleteHander}
      />
      {isEdit ? (
        <form
          className='edit-input'
          onSubmit={onEditHander}
          id='comment-edit-form'
        >
          <textarea name='newComment' defaultValue={comment.content} />
        </form>
      ) : (
        <div className='content'>{comment.content}</div>
      )}
    </li>
  );
}

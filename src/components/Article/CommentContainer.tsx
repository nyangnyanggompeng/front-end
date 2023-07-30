import { useRef } from 'react';
import { useTheme } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import CommentList from './CommentList';
import { CommentWriteType } from '../../types/Community/commentTypes';
import { postComment } from '../../utils/Community/postComment';
import { CommentForm } from '../../styles/Community';
import Button from '../Common/Button';

type CommentContainerProps = {
  postId?: string;
};

export default function CommentContainer({ postId }: CommentContainerProps) {
  const theme = useTheme();
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  function handlePostComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newComment = formData.get('newComment') as string;
    if (!newComment || newComment === '') {
      alert('댓글을 작성해주세요.');
      return;
    }
    if (!postId || isNaN(parseInt(postId))) {
      alert('post id를 찾을 수 없습니다.');
      return;
    }
    const commentForm: CommentWriteType = {
      content: newComment,
    };
    postComment(commentForm, parseInt(postId))
      .then(() => {
        alert('댓글 등록에 성공했습니다.');
        queryClient.invalidateQueries({ queryKey: ['comments'] });
        if (commentRef.current) {
          commentRef.current.value = '';
        }
      })
      .catch(() => alert('서버 오류입니다. 잠시 후 다시 시도해주세요.'));
  }

  if (!postId || isNaN(parseInt(postId))) return null;

  return (
    <div>
      <CommentList postId={parseInt(postId)} />
      <form onSubmit={handlePostComment} css={CommentForm(theme)}>
        <textarea
          ref={commentRef}
          name='newComment'
          placeholder='댓글을 작성해주세요.'
        ></textarea>
        <Button type='submit'>등록하기</Button>
      </form>
    </div>
  );
}

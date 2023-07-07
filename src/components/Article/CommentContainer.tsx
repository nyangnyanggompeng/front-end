import CommentList from './CommentList';
import { CommentWriteType } from '../../types/Community/commentTypes';
import { postComment } from '../../utils/Community/postComment';

type CommentContainerProps = {
  postId?: string;
};

export default function CommentContainer({ postId }: CommentContainerProps) {
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
      .then(() => alert('댓글 등록에 성공했습니다.'))
      .catch(() => alert('서버 오류입니다. 잠시 후 다시 시도해주세요.'));
  }

  return (
    <div>
      <CommentList postId={postId} />
      {/* TODO : 입력창 추가하기 */}
      <form onSubmit={handlePostComment}>
        <textarea
          name='newComment'
          placeholder='댓글을 작성해주세요.'
        ></textarea>
        <button type='submit'>등록하기</button>
      </form>
    </div>
  );
}

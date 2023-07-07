import { useState } from 'react';
import useGetComments from '../../hooks/Article/useGetComments';
import CommentItem from './CommentItem';

type CommentListProps = {
  postId?: string;
};

export default function CommentList({ postId }: CommentListProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { commentData, isLoading } = useGetComments(currentPage, postId);

  if (isLoading) return <div>로딩중</div>;
  if (!commentData) return <div>오류 발생</div>; // TODO : 에러의 경우 어떤 것을 랜더링해야 할 지 고민. 에러페이지?

  return (
    <div>
      {commentData.numberOfComment !== 0 && (
        <div>`댓글 ${commentData.numberOfComment}`</div>
      )}
      <ul>
        {commentData.numberOfComment === 0 ? (
          <div>등록된 댓글이 없습니다.</div>
        ) : (
          commentData.Comment.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </ul>
      {/* TODO : 페이지네이션 적용하기 */}
      <button onClick={() => setCurrentPage(currentPage - 1)}>prev</button>
      <button onClick={() => setCurrentPage(currentPage + 1)}>next</button>
    </div>
  );
}

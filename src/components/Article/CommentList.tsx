import { useState } from 'react';
import { useTheme } from '@emotion/react';
import useGetComments from '../../hooks/Article/useGetComments';
import CommentItem from './CommentItem';
import Pagination from '../Common/Pagination';
import {
  CommentContainer,
  CommentListContainer,
  // EmptyCommentContainer,
} from '../../styles/Community';

type CommentListProps = {
  postId: number;
};

export default function CommentList({ postId }: CommentListProps) {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isError, isLoading } = useGetComments(currentPage, postId);

  if (isLoading) return <div>로딩중</div>;
  if (isError || !data) return <div>오류 발생</div>; // TODO : 에러의 경우 어떤 것을 랜더링해야 할 지 고민. 에러페이지?

  return (
    <div css={CommentContainer}>
      {data.numberOfComment !== 0 && (
        <div className='total-comments'>{`댓글 ${data.numberOfComment}`}</div>
      )}
      <ul css={CommentListContainer(theme)}>
        {data.numberOfComment === 0
          ? null
          : data.Comment.map((comment) => (
              <CommentItem key={comment.id} comment={comment} postId={postId} />
            ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={data.totalPages}
      />
    </div>
  );
}

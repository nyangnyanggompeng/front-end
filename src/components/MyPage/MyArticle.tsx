import { useState } from 'react';
import useGetMyArticle from '../../hooks/MyPage/useGetMyArticle';
import { MyArticleType } from '../../types/MyPage/MyArticleTypes';
import { ArticleListItem } from '../Community/ArticleListItem';
import Pagination from '../Common/Pagination';

export default function MyArticle() {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, isError, error, myArticleData } =
    useGetMyArticle(currentPage);
  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>{error}</div>;
  return (
    <div>
      <div>{`전체 ${myArticleData.numberOfPost}개`}</div>
      {myArticleData.post.map((post: MyArticleType) => (
        <ArticleListItem
          key={post.id}
          title={post.title}
          writer={post.writer}
          createdAt={post.createdAt}
          numOfComment={post.numOfComment}
        />
      ))}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={myArticleData.totalPages}
      />
    </div>
  );
}

import { useState } from 'react';
import useGetMyArticle from '../../hooks/MyPage/useGetMyArticle';
import { ArticleDataItemType } from '../../types/Community/articleTypes';
import Pagination from '../Common/Pagination';
import MyArticleItem from './MyArticleItem';

export default function MyArticle() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState<Set<number>>(
    new Set()
  );
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const { isLoading, isError, error, data } = useGetMyArticle(currentPage);
  if (isLoading) return <div>로딩중</div>;
  if (isError || data === undefined) return <div>에러!</div>;

  function handleSelectArticle(checked: boolean, id: number) {
    setSelectedArticle((prev) => {
      if (checked) prev.add(id);
      else prev.delete(id);
      return prev;
    });
  }

  function deleteHandler() {
    if (selectedArticle.size === 0) {
      alert('삭제할 게시글을 선택해주세요.');
      return;
    }
    if (window.confirm('정말 삭제하시겠습니까?')) {
      // 삭제 요청 보내기
      console.log(selectedArticle);
      // 성공하면 삭제 모드 해제
      alert('삭제되었습니다.');
      setIsDeleteMode(false);
    }
  }

  return (
    <div>
      {data.Post && data.Post.length === 0 ? (
        <div>작성한 게시글이 없습니다.</div>
      ) : (
        <div>
          <div>{`전체 ${data?.numberOfMyPost}개`}</div>
          <div>
            {isDeleteMode ? (
              <>
                <button onClick={() => setIsDeleteMode(false)}>❌ 취소</button>
                <button onClick={() => deleteHandler()}>🗑삭제하기</button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsDeleteMode(true);
                  setSelectedArticle(new Set());
                }}
              >
                🗑 선택 삭제
              </button>
            )}
          </div>
          {data.Post.map((post: ArticleDataItemType) => (
            <MyArticleItem
              key={post.id}
              isDeleteMode={isDeleteMode}
              myArticle={post}
              selectHandler={handleSelectArticle}
            />
          ))}
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={data.totalPages}
          />
        </div>
      )}
    </div>
  );
}

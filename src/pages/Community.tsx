import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleDataType } from '../types/Community/communityTypes';
import { ArticleList } from '../components/Community/ArticleList';
import Pagination from '../components/Community/Pagination';
import { getArticles } from '../utils/Community/getArticles';

function Community() {
  // TODO : 게시물 목록 불러오기
  const [ArticleData, setArticleData] = useState<ArticleDataType>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    getArticles(currentPage)
      .then((articleData: ArticleDataType) => setArticleData(articleData))
      .catch(() => {
        alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
      })
      .finally(() => setIsLoading(false));
  }, [currentPage]);

  if (isLoading) return <div>로딩중</div>;

  if (ArticleData === undefined || ArticleData.post.length === 0)
    return <div>게시물이 없습니다.</div>;

  return (
    <div>
      <div>커뮤니티</div>
      <div>전체 ${ArticleData.numberOfPost}개</div>
      <button onClick={() => navigate('/writing')}>글쓰기</button>
      <ArticleList articleList={ArticleData.post} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={ArticleData.totalPages}
      />
    </div>
  );
}

export default Community;
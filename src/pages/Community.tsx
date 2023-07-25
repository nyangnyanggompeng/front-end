import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { ArticleDataType } from '../types/Community/articleTypes';
import { ArticleList } from '../components/Community/ArticleList';
import Pagination from '../components/Common/Pagination';
import { getArticles } from '../utils/Community/getArticles';
import Button from '../components/Common/Button';
import { CommunityContainer, ButtonContainer } from '../styles/Community';

function Community() {
  const theme = useTheme();
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

  if (!ArticleData || !ArticleData.Post || ArticleData.Post.length === 0)
    return <div>게시물이 없습니다.</div>;

  return (
    <div css={CommunityContainer(theme)}>
      <h3>{`전체 ${ArticleData.numberOfPost}개`}</h3>
      <hr />
      <div css={ButtonContainer}>
        <Button onClick={() => navigate('/community/writing')}>+ 글쓰기</Button>
      </div>
      <ArticleList articleList={ArticleData.Post} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={ArticleData.totalPages}
      />
    </div>
  );
}

export default Community;

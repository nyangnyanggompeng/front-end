import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { ArticleDataType } from '../types/Community/articleTypes';
import { ArticleList } from '../components/Community/ArticleList';
import Pagination from '../components/Common/Pagination';
import { getArticles } from '../utils/Community/getArticles';
import Button from '../components/Common/Button';
import { CommunityContainer, ButtonContainer } from '../styles/Community';
import { ErrorPageType, isErrorPageType } from '../types/Common';

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
      .catch((err: unknown) => {
        if (err instanceof Error && isErrorPageType(err.message))
          throw new Error(err.message as ErrorPageType);
        throw new Error('INTERNAL_SERVER_ERROR');
      })
      .finally(() => setIsLoading(false));
  }, [currentPage]);

  if (isLoading || !ArticleData) return <div>로딩중</div>;

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

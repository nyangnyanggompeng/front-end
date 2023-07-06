import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleType } from '../types/Community/communityTypes';
import { ArticleList } from '../components/Community/ArticleList';
import Pagination from '../components/Community/Pagination';
import { getArticles } from '../utils/Community/getArticles';

function Community() {
  // TODO : 게시물 목록 불러오기
  const [posts, setPosts] = useState<ArticleType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  useEffect(() => {
    getArticles(currentPage)
      .then((articles: ArticleType[]) => setPosts(articles))
      .catch(() => {
        alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
      });
  }, [currentPage]);

  return (
    <div>
      <ArticleList articleList={posts} />
      <button onClick={() => navigate('/writing')}>글쓰기</button>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={10} // TODO : 임시로 넣은 값이므로 구현되면 수정해야 함.
      />
    </div>
  );
}

export default Community;

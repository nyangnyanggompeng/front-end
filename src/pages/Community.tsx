import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postType } from '../types/Community/communityTypes';
import { PostList } from '../components/Community/PostList';

function Community() {
  // TODO : 게시물 목록 불러오기
  const [posts, setPosts] = useState<postType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  useEffect(() => {
    // TODO : 현재 페이지에 맞게 게시물 목록 불러오기
  }, [currentPage]);

  return (
    <div>
      <PostList postList={posts} />
      <button onClick={() => navigate('/writing')}>글쓰기</button>
      {/* 페이지네이션 - currentPage, setCurrentPage 함수 전달 */}
    </div>
  );
}

export default Community;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { postType } from '../types/Community/communityTypes';
import { PostList } from '../components/Community/PostList';
import Pagination from '../components/Community/Pagination';

function Community() {
  // TODO : 게시물 목록 불러오기
  const [posts, setPosts] = useState<postType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  useEffect(() => {
    axios.post(`/board/${currentPage}`);
  }, [currentPage]);

  return (
    <div>
      <PostList postList={posts} />
      <button onClick={() => navigate('/writing')}>글쓰기</button>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Community;

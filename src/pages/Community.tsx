import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSearchbar } from '../hooks/Community/useSearchBar';
import { postType } from '../types/Community/communityTypes';
import { SearchBar } from '../components/Community/SearchBar';
import { PostList } from '../components/Community/PostList';

function Community() {
  // TODO : 게시물 목록 불러오기
  const [posts, setPosts] = useState<postType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { searchResult } = useSearchbar();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    // TODO : 현재 페이지에 맞게 게시물 목록 불러오기
  }, [currentPage]);

  // TODO : 쿼리 존재 여부에 따라서 어떤 게시물 목록을 불러올지 결정해야 할 듯
  const postList = searchParams.get('searchKeyword') ? searchResult : posts;

  return (
    <div>
      <SearchBar totalPost={posts.length} />
      <PostList postList={postList} />
      <button onClick={() => navigate('/writing')}>글쓰기</button>
      {/* 페이지네이션 - currentPage, setCurrentPage 함수 전달 */}
    </div>
  );
}

export default Community;

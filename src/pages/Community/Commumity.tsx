import { useState, useEffect } from 'react';
import { postType } from '../../types/communityTypes';

export function Community() {
  // TODO : 게시물 목록 불러오기
  const [posts, setPosts] = useState<postType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    // TODO : 현재 페이지에 맞게 게시물 목록 불러오기
    setPosts([
      {
        id: 1,
        title: '제목',
        content: '내용',
        writer: '작성자',
        createdAt: '작성일',
      },
      {
        id: 2,
        title: '제목',
        content: '내용',
        writer: '작성자',
        createdAt: '작성일',
      },
    ]);
  }, [currentPage]);

  return (
    <div>
      {/* SEARCH BAR - 총 글 개수, 검색바 */}
      {/* POST TABLE */}
      {/* 글쓰기 버튼 */}
      {/* 페이지네이션 - currentPage, setCurrentPage 함수 전달 */}
    </div>
  );
}

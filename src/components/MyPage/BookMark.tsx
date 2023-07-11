import { useState } from 'react';
import BookMarkItem from './BookMarkItem';
import Pagination from '../Common/Pagination';
import { BookMarkType, BookMarkData } from '../../types/MyPage/BookMarkTypes';
import useGetBookMark from '../../hooks/MyPage/useGetBookMark';

export default function BookMark() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isLoading, isError, error, bookmarkData } =
    useGetBookMark(currentPage);
  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>{error}</div>;
  return (
    <div>
      <div>{`전체 ${bookmarkData.numberOfBookmark}개`}</div>
      {bookmarkData.bookmark.map((bookmark: BookMarkType) => (
        <BookMarkItem key={bookmark.contentId} bookmark={bookmark} />
      ))}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={bookmarkData.totalPages}
      />
    </div>
  );
}

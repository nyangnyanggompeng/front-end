import { useState } from 'react';
import BookMarkItem from './BookMarkItem';
import Pagination from '../Common/Pagination';
import { BookMarkType } from '../../types/MyPage/BookMarkTypes';
import useGetBookMark from '../../hooks/MyPage/useGetBookMark';

export default function BookMark() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isLoading, isError, error, data } = useGetBookMark(currentPage);
  if (isLoading) return <div>로딩중</div>;
  if (isError || data === undefined) return <div>에러!</div>;
  return (
    <div>
      <div>{`전체 ${data.numberOfContent}개`}</div>
      {data.Content.map((bookmark: BookMarkType) => (
        <BookMarkItem key={bookmark.id} bookmark={bookmark} />
      ))}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={data.totalPages}
      />
    </div>
  );
}
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
      {data.Content.length === 0 ? (
        <div>북마크가 없습니다.</div>
      ) : (
        <div>
          <h3>{`전체 ${data.numberOfContent}개`}</h3>
          {data.Content.map((bookmark: BookMarkType) => (
            <BookMarkItem key={bookmark.id} bookmark={bookmark} />
          ))}
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={data.totalPages}
          />
        </div>
      )}
    </div>
  );
}

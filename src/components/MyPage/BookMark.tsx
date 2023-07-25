import { useState } from 'react';
import { useTheme } from '@emotion/react';
import BookMarkItem from './BookMarkItem';
import Pagination from '../Common/Pagination';
import { Loading } from '../Common';
import { BookMarkData, BookMarkType } from '../../types/MyPage/BookMarkTypes';
import useGetBookMark from '../../hooks/MyPage/useGetBookMark';
import { ContentTotal } from '../../styles/MyPage';

export default function BookMark() {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isLoading, isError, error, data } = useGetBookMark(currentPage);
  if (isLoading) return <Loading theme={theme} />;
  if (isError || data === undefined) return <div>에러!</div>;

  return (
    <div>
      {data.Content.length === 0 ? (
        <div>북마크가 없습니다.</div>
      ) : (
        <div>
          <div css={ContentTotal}>{`전체 ${data.numberOfContent}개`}</div>
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

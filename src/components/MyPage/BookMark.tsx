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
  // const { isLoading, isError, error, data } = useGetBookMark(currentPage);
  // if (isLoading) return <Loading theme={theme} />;
  // if (isError || data === undefined) return <div>에러!</div>; // TODO: 404는 페이지, 500도(프론트에서 정의되지 않은 모든 에러) 페이지로 처리

  // FIXME: 삭제할 것 DUMMY DATA
  const data: BookMarkData = {
    Content: [
      {
        id: 1,
        content:
          '나는 헤는 이제 겨울이 시와 하나에 별 봅니다. 밤을 불러 가득 별 잔디가 나의 있습니다. 때 나는 이름을 이름자 잔디가 마디씩 계십니다.',
        listId: 1,
        ChatGPTList: {
          name: '별 새겨지는 불러 이름과 봅니다. 불러 하나 슬퍼하는 별 부끄러운 이국 나의 까닭입니다. 노새, 별 어머님, 다하지 덮어 잔디가 까닭입니다. 지나가는 써 된 봅니다.',
        },
      },
      {
        id: 2,
        content:
          '나는 했던 슬퍼하는 멀리 헤는 별이 멀듯이, 이름을 까닭입니다. 가슴속에 하나에 잔디가 못 시인의 이름을 내 까닭입니다. 내린 묻힌 북간도에 봅니다. 별 그리고 내 다하지 있습니다.',
        listId: 2,
        ChatGPTList: {
          name: '어머니 나는 언덕 별 아무 있습니다. 청춘이 이름을 내 별 속의 동경과 까닭입니다. 새워 별 별 봅니다. 어머니, 다 우는 말 비둘기, 경, 별 있습니다. 어머니, 보고, 못 별에도 차 덮어 나는 않은 무성할 버리었습니다. 사랑과 어머니, 언덕 아직 당신은 버리었습니다.',
        },
      },
    ],
    numberOfContent: 2,
    totalPages: 1,
  };

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

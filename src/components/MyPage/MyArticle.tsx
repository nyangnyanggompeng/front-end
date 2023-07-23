import { useState } from 'react';
import useGetMyArticle from '../../hooks/MyPage/useGetMyArticle';
import { ArticleDataItemType } from '../../types/Community/articleTypes';
import Pagination from '../Common/Pagination';
import MyArticleItem from './MyArticleItem';
import {
  DeleteMyArticleRequestType,
  myArticlesDataType,
} from '../../types/MyPage/MyArticleTypes';
import { deleteMyArticles } from '../../utils/MyPage/deleteMyArticles';
import Button from '../Common/Button';
import {
  ContentTitleContainer,
  ContentTotal,
  DeleteButtonsContainer,
} from '../../styles/MyPage';
const deleteStatusMessage: Record<
  'OK' | 'BAD_REQUEST' | 'INTERNAL_SERVER_ERROR',
  string
> = {
  OK: '삭제되었습니다.',
  BAD_REQUEST: '선택된 게시글이 없습니다.',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

export default function MyArticle() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState<Set<number>>(
    new Set()
  );
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  // const { isLoading, isError, error, data } = useGetMyArticle(currentPage);
  // if (isLoading) return <div>로딩중</div>;
  // if (isError || data === undefined) return <div>에러!</div>;

  const data: myArticlesDataType = {
    Post: [
      {
        id: 1,
        title:
          '제목이 엄청 길때에는 말줄임표를 사용해야하는데 제목의 전체 영역은 어떻게 할까요? aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        writer: '작성자 닉네임 왁왁왁',
        createdAt: '2021-09-01',
        userId: 1,
        numberOfComment: 1,
      },
      {
        id: 1,
        title: '제목이 엄청 길때에는 말줄임표를 사용해야',
        writer: '작성자',
        createdAt: '2021-09-01',
        userId: 1,
        numberOfComment: 100,
      },
    ],
    numberOfMyPost: 1,
    totalPages: 1,
  };

  function handleSelectArticle(checked: boolean, id: number) {
    setSelectedArticle((prev) => {
      if (checked) prev.add(id);
      else prev.delete(id);
      return prev;
    });
  }

  function deleteHandler() {
    if (selectedArticle.size === 0) {
      alert('삭제할 게시글을 선택해주세요.');
      return;
    }
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const deleteMyArticleRequest: DeleteMyArticleRequestType = {
        postIdList: Array.from(selectedArticle),
      };
      deleteMyArticles(deleteMyArticleRequest)
        .then(() => {
          alert(deleteStatusMessage['OK']);
          setIsDeleteMode(false);
        })
        .catch((e) => {
          if (e === 'BAD_REQUEST') alert(deleteStatusMessage['BAD_REQUEST']);
          else alert(deleteStatusMessage['INTERNAL_SERVER_ERROR']);
        });
      // 성공하면 삭제 모드 해제
      setIsDeleteMode(false);
    }
  }

  return (
    <div>
      {data.Post && data.Post.length === 0 ? (
        <div>작성한 게시글이 없습니다.</div>
      ) : (
        <div>
          <div css={ContentTitleContainer}>
            <div css={ContentTotal}>{`전체 ${data?.numberOfMyPost}개`}</div>
            {isDeleteMode ? (
              <div css={DeleteButtonsContainer}>
                <Button onClick={() => setIsDeleteMode(false)}>취소</Button>
                <Button onClick={() => deleteHandler()}>삭제하기</Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  setIsDeleteMode(true);
                  setSelectedArticle(new Set());
                }}
              >
                선택 삭제
              </Button>
            )}
          </div>
          {data.Post.map((post: ArticleDataItemType) => (
            <MyArticleItem
              key={post.id}
              isDeleteMode={isDeleteMode}
              myArticle={post}
              selectHandler={handleSelectArticle}
            />
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

import { useState } from 'react';
import useGetMyComment from '../../hooks/MyPage/useGetMyComment';
import {
  MyCommentType,
  MyCommentDataType,
} from '../../types/MyPage/MyCommentTypes';
import Pagination from '../Common/Pagination';
import MyCommentItem from './MyCommentItem';
import { deleteMyComments } from '../../utils/MyPage/deleteMyComments';
import { DeleteMyCommentRequestType } from '../../types/MyPage/MyCommentTypes';
import {
  ContentTotal,
  ContentTitleContainer,
  DeleteButtonsContainer,
} from '../../styles/MyPage';
import Button from '../Common/Button';

const deleteStatusMessage: Record<
  'OK' | 'BAD_REQUEST' | 'INTERNAL_SERVER_ERROR',
  string
> = {
  OK: '삭제되었습니다.',
  BAD_REQUEST: '선택된 댓글이 없습니다.',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

export default function MyComment() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedComment, setSelectedComment] = useState<Set<number>>(
    new Set()
  );
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  // const { isLoading, isError, error, data } = useGetMyComment(currentPage);
  // if (isLoading) return <div>로딩중</div>;
  // if (isError || data === undefined) return <div>에러!</div>;

  const data: MyCommentDataType = {
    Comment: [
      {
        id: 1,
        writer: 'writer',
        content:
          '북간도에 차 헤일 마디씩 말 까닭이요, 위에도 듯합니다. 봄이 동경과 별 오는 있습니다. 사랑과 말 이름자를 다 별 별이 까닭이요, 봅니다. 마디씩 다하지 시인의 다 듯합니다. 경, 당신은 이제 라이너 그러나 애기 듯합니다. 하나 우는 하나에 지나고 불러 남은 있습니다. 이름자 하나에 내 애기 마리아 이름과 헤는 나의 어머니, 까닭입니다.',
        createdAt: '2021-08-01',
        postId: 1,
        Post: {
          title:
            '새겨지는 노새, 소학교 버리었습니다. 없이 하나 위에 위에도 흙으로 어머님, 북간도에 까닭입니다. 사랑과 나는 이런 거외다. 풀이 때 못 오면 새워 같이 아스라히 라이너 봅니다. 사랑과 이름과 오는 불러 잠, 이런 어머님, 계십니다. 보고, 별 이름과 내린 패, 잠, 밤이 위에도 이름자를 까닭입니다.',
        },
      },
      {
        id: 2,
        writer: 'writer',
        content:
          '아이들의 파란 별빛이 멀리 버리었습니다. 소학교 릴케 헤는 흙으로 별에도 말 봅니다. 까닭이요, 써 시와 듯합니다. 둘 마리아 이런 봅니다.',
        createdAt: '2021-08-01',
        postId: 2,
        Post: {
          title: '새겨지는 노새, 소학교 버리었습니다.',
        },
      },
    ],
    numberOfMyComment: 2,
    totalPages: 5,
  };

  function handleSelectComment(checked: boolean, id: number) {
    setSelectedComment((prev) => {
      if (checked) prev.add(id);
      else prev.delete(id);
      return prev;
    });
  }

  function deleteHandler() {
    if (selectedComment.size === 0) {
      alert(deleteStatusMessage['BAD_REQUEST']);
      return;
    }
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const deleteMyCommentRequest: DeleteMyCommentRequestType = {
        commentIdList: Array.from(selectedComment),
      };
      deleteMyComments(deleteMyCommentRequest)
        .then(() => {
          alert(deleteStatusMessage['OK']);
          setIsDeleteMode(false);
        })
        .catch((e) => {
          if (e === 'BAD_REQUEST') alert(deleteStatusMessage['BAD_REQUEST']);
          else alert(deleteStatusMessage['INTERNAL_SERVER_ERROR']);
        });
    }
  }

  return (
    <div>
      {data.Comment && data.Comment.length === 0 ? (
        <div>작성한 댓글이 없습니다.</div>
      ) : (
        <div>
          <div css={ContentTitleContainer}>
            <div css={ContentTotal}>{`전체 ${data.numberOfMyComment}개`}</div>
            {isDeleteMode ? (
              <div css={DeleteButtonsContainer}>
                <Button onClick={() => setIsDeleteMode(false)}>취소</Button>
                <Button onClick={() => deleteHandler()}>삭제하기</Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  setIsDeleteMode(true);
                  setSelectedComment(new Set());
                }}
              >
                선택 삭제
              </Button>
            )}
          </div>
          {data.Comment.map((comment: MyCommentType) => (
            <MyCommentItem
              key={comment.id}
              isDeleteMode={isDeleteMode}
              myComment={comment}
              selectHandler={handleSelectComment}
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

import { useState } from 'react';
import useGetMyComment from '../../hooks/MyPage/useGetMyComment';
import { MyCommentType } from '../../types/MyPage/MyCommentTypes';
import Pagination from '../Common/Pagination';
import MyCommentItem from './MyCommentItem';
import { deleteMyComments } from '../../utils/MyPage/deleteMyComments';
import { DeleteMyCommentRequestType } from '../../types/MyPage/MyCommentTypes';

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
  const { isLoading, isError, error, data } = useGetMyComment(currentPage);
  if (isLoading) return <div>로딩중</div>;
  if (isError || data === undefined) return <div>에러!</div>;

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
          <h3>{`전체 ${data.numberOfMyComment}개`}</h3>
          <div>
            {isDeleteMode ? (
              <>
                <button onClick={() => setIsDeleteMode(false)}>❌ 취소</button>
                <button onClick={() => deleteHandler()}>🗑삭제하기</button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsDeleteMode(true);
                  setSelectedComment(new Set());
                }}
              >
                🗑 선택 삭제
              </button>
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

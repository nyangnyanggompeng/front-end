import { useState } from 'react';
import useGetMyComment from '../../hooks/MyPage/useGetMyComment';
import { MyCommentType } from '../../types/MyPage/MyCommentTypes';
import Pagination from '../Common/Pagination';
import MyCommentItem from './MyCommentItem';

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
      alert('삭제할 댓글을 선택해주세요.');
      return;
    }
    if (window.confirm('정말 삭제하시겠습니까?')) {
      // 삭제 요청 보내기
      console.log(selectedComment);
      // 성공하면 삭제 모드 해제
      alert('삭제되었습니다.');
      setIsDeleteMode(false);
    }
  }

  return (
    <div>
      {data.Comment && data.Comment.length === 0 ? (
        <div>작성한 댓글이 없습니다.</div>
      ) : (
        <div>
          <div>{`전체 ${data.numberOfMyComment}개`}</div>
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

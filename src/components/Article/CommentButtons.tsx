type CommentButtonsProps = {
  isEdit: boolean;
  currentUserId: number;
  commentUserId: number;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  deleteFunction: () => void;
};

export function CommentButtons({
  isEdit,
  currentUserId,
  commentUserId,
  setIsEdit,
  deleteFunction,
}: CommentButtonsProps) {
  function editHander(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setIsEdit(true);
  }

  function deleteHander(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    deleteFunction();
  }

  function cancelHander(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setIsEdit(false);
  }

  if (isEdit) {
    return (
      <div className='edit-btn'>
        <button onClick={cancelHander}>수정취소</button>
        <span>|</span>
        <button type='submit' form='comment-edit-form'>
          작성완료
        </button>
      </div>
    );
  }
  if (currentUserId && currentUserId === commentUserId) {
    return (
      <div className='edit-btn'>
        <button onClick={editHander}>수정</button>
        <span>|</span>
        <button onClick={deleteHander}>삭제</button>
      </div>
    );
  }
  return null;
}

import { CommentType } from '../../types/Community/commentTypes';
import { getDate } from '../../utils/Common/getDate';

type CommentItemProps = {
  comment: CommentType;
};

export default function CommentItem({ comment }: CommentItemProps) {
  // TODO : 현재 로그인된 유저의 id가 필요함.
  const currentUserId = 1;
  return (
    <li>
      <div>{comment.writer}</div>
      <div>{getDate(new Date(comment.createdAt))}</div>
      {currentUserId === comment.userId && (
        <div>
          <div>수정</div>
          <div>삭제</div>
        </div>
      )}
      <div>{comment.content}</div>
    </li>
  );
}

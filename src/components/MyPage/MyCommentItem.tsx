import { Link } from 'react-router-dom';
import { MyCommentType } from '../../types/MyPage/MyCommentTypes';
import { getDate } from '../../utils/Common/getDate';

type MyCommentItemProps = {
  isDeleteMode: boolean;
  myComment: MyCommentType;
  selectHandler: (checked: boolean, id: number) => void;
};

export default function MyCommentItem({
  isDeleteMode,
  myComment,
  selectHandler,
}: MyCommentItemProps) {
  return (
    <div>
      {isDeleteMode && (
        <input
          type='checkbox'
          onChange={(e) => selectHandler(e.target.checked, myComment.id)}
        />
      )}
      <div>{myComment.writer}</div>
      <div>{getDate(new Date(myComment.createdAt))}</div>
      <div>{myComment.content}</div>
      <Link
        to={`/community/${myComment.postId}`}
      >{`게시글 제목: ${myComment.Post.title}`}</Link>
    </div>
  );
}

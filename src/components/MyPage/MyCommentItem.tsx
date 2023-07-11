import { Link } from 'react-router-dom';
import { MyCommentType } from '../../types/MyPage/MyCommentTypes';

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
      <input
        style={{ visibility: isDeleteMode ? 'visible' : 'hidden' }}
        type='checkbox'
        onChange={(e) => selectHandler(e.target.checked, myComment.id)}
      />
      <div>{myComment.writer}</div>
      <div>{getDate(new Date(myComment.createdAt))}</div>
      <div>{myComment.content}</div>
      <Link
        to={`/community/${myComment.postId}`}
      >{`게시글 제목: ${myComment.postTitle}`}</Link>
    </div>
  );
}

// TODO : 중복된 함수이므로 추후 삭제 (utils에 있음)
function getDate(date: Date) {
  const currentDate = new Date();
  if (
    date.getFullYear() !== currentDate.getFullYear() ||
    date.getMonth() !== currentDate.getMonth() ||
    date.getDate() !== currentDate.getDate()
  ) {
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  }
  return `${date.getHours()}:${date.getMinutes()}`;
}

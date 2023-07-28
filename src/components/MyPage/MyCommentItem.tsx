import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { MyCommentType } from '../../types/MyPage/MyCommentTypes';
import { getDate } from '../../utils/Common/getDate';
import { CommentItemContainer, CommentItemStyle } from '../../styles/MyPage';
import { OverflowEllipsis } from '../../styles/utils';

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
  const theme = useTheme();
  return (
    <div css={CommentItemContainer(isDeleteMode ? 'DELETE' : 'VIEW')}>
      {isDeleteMode && (
        <input
          type='checkbox'
          onChange={(e) => selectHandler(e.target.checked, myComment.id)}
        />
      )}
      <div css={CommentItemStyle(theme)}>
        <div className='writer' css={OverflowEllipsis}>
          {myComment.writer}
        </div>
        <div className='date' css={OverflowEllipsis}>
          {getDate(new Date(myComment.createdAt))}
        </div>
        <div className='content'>{myComment.content}</div>
        <Link
          className='post-link'
          css={OverflowEllipsis}
          to={`/community/${myComment.postId}`}
        >{`게시글 제목: ${myComment.Post.title}`}</Link>
      </div>
    </div>
  );
}

import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import {
  ArticleItemContainer,
  ArticleItemTitle,
  ArticleItemDate,
  ArticleItemComments,
} from '../../styles/Community';
import { OverflowEllipsis } from '../../styles/utils';
import { getDate } from '../../utils/Common/getDate';

type ArticleListItemProps = {
  title: string;
  writer: string;
  createdAt: string;
  numberOfComment: number;
  id: number;
};

export function ArticleListItem({
  title,
  writer,
  createdAt,
  numberOfComment,
  id,
}: ArticleListItemProps) {
  const theme = useTheme();
  return (
    <div css={ArticleItemContainer(theme)}>
      <Link to={`/community/${id}`} css={ArticleItemTitle}>
        {title}
      </Link>
      <div css={OverflowEllipsis}>{writer}</div>
      <div css={ArticleItemDate}>{getDate(new Date(createdAt))}</div>
      <div css={ArticleItemComments}>
        <FontAwesomeIcon icon={faComment} />
        {numberOfComment}
      </div>
    </div>
  );
}

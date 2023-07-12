import { Link } from 'react-router-dom';
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
  return (
    <div>
      <Link to={`/community/${id}`}>제목: {title}</Link>
      <div>작성자: {writer}</div>
      <div>작성일: {getDate(new Date(createdAt))}</div>
      <div>댓글수: {numberOfComment}</div>
    </div>
  );
}

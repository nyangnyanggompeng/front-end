import { getDate } from '../../utils/Common/getDate';

type ArticleListItemProps = {
  title: string;
  writer: string;
  createdAt: string;
  numOfComment: number;
};

export function ArticleListItem({
  title,
  writer,
  createdAt,
  numOfComment,
}: ArticleListItemProps) {
  return (
    <div>
      <div>{title}</div>
      <div>{writer}</div>
      <div>{getDate(new Date(createdAt))}</div>
      <div>{numOfComment}</div>
    </div>
  );
}

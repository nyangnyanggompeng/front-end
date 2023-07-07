import { getDate } from '../../utils/Common/getDate';

type PostListItemProps = {
  title: string;
  writer: string;
  createdAt: string;
};

export function PostListItem({ title, writer, createdAt }: PostListItemProps) {
  return (
    <div>
      <div>{title}</div>
      <div>{writer}</div>
      <div>{getDate(new Date(createdAt))}</div>
    </div>
  );
}

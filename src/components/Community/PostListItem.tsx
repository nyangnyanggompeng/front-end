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

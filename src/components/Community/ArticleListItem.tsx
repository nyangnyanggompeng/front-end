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

import { Viewer } from './Viewer';

type ContentProps = {
  postId: number;
};

function Content({ postId }: ContentProps) {
  const post = {
    id: 1,
    writer: '냥냥곰펭',
    title: '안녕하세요',
    content: '안녕하세요. 냥냥곰펭입니다.',
    createdAt: '2021-10-01 12:00:00',
  };
  return (
    <div>
      <div>{post.title}</div>
      <div>{post.writer}</div>
      <div>{getDate(post.createdAt)}</div>
      <Viewer content={post.content} />
    </div>
  );
}

function getDate(date: string) {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  return `${year}.${month}.${day}`;
}

export default Content;

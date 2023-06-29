import { useParams } from 'react-router-dom';
import { Viewer } from '../components/Article/components/Viewer';

export function Article() {
  const { id } = useParams();
  // TODO: id를 이용해서 서버에서 게시글 정보를 가져온다.
  // const { post, comment } = SOME_API_CALL(id); // hook
  // DUMMY DATA
  const post = {
    id: 1,
    writer: '냥냥곰펭',
    title: '안녕하세요',
    content: '안녕하세요. 냥냥곰펭입니다.',
    createdAt: '2021-10-01 12:00:00',
  };
  const comment = [
    {
      id: 3,
      writer: '냥냥곰펭',
      content: '댓글1',
      createdAt: '2021-10-01 12:00:00',
    },
  ];

  return (
    <div>
      <div>{post.title}</div>
      <div>{post.writer}</div>
      <div>{getDate(post.createdAt)}</div>
      <Viewer content={post.content} />
      {/* Comment props: comment, post id */}
      {/* Article Buttons (삭제하기, 수정하기, 목록으로) */}
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

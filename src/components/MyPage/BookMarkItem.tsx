import { Link } from 'react-router-dom';
import { BookMarkType } from '../../types/MyPage/BookMarkTypes';

type BookMarkItemProps = {
  bookmark: BookMarkType;
};

export default function BookMarkItem({ bookmark }: BookMarkItemProps) {
  function deleteHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    // TODO : 북마크 api 작업시에 북마크 해제 기능 추가 예정입니다.
    console.log('북마크 해제');
  }

  return (
    <div key={bookmark.id}>
      <div>{bookmark.content}</div>
      {/* TODO : CHAT GPT 작업 끝나면 링크 추가 예정입니다. */}
      <Link to=''>{bookmark.ChatGPTList.name}</Link>
      <button onClick={deleteHandler}>🗑 북마크 해제</button>
      {/* TODO : hr 태그는 css 작업시에 삭제할 예정입니다.. */}
      <hr />
    </div>
  );
}

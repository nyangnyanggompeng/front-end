import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { BookMarkType } from '../../types/MyPage/BookMarkTypes';
import { deleteBookmark } from '../../utils/Common/deleteBookmark';

type BookMarkItemProps = {
  bookmark: BookMarkType;
};

export default function BookMarkItem({ bookmark }: BookMarkItemProps) {
  const queryClient = useQueryClient();
  function deleteHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    window.confirm('북마크를 해제하시겠습니까?') &&
      deleteBookmark(bookmark.id)
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
          alert('북마크 해제 완료');
        })
        .catch(() => alert('북마크 해제 실패. 다시 시도해주세요.'));
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

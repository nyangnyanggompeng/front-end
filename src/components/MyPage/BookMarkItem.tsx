import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { BookMarkType } from '../../types/MyPage/BookMarkTypes';
import { deleteBookmark } from '../../utils/Common/deleteBookmark';
import {
  BookMarkItemContainer,
  BookMarkItemContent,
  BookMarkItemTop,
  BookMarkItemBottom,
} from '../../styles/MyPage';

type BookMarkItemProps = {
  bookmark: BookMarkType;
};

export default function BookMarkItem({ bookmark }: BookMarkItemProps) {
  const theme = useTheme();
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
    <div key={bookmark.id} css={BookMarkItemContainer(theme)}>
      <div css={BookMarkItemTop}>
        <div css={BookMarkItemContent}>{bookmark.content}</div>
        <button onClick={deleteHandler}>
          <FontAwesomeIcon icon={faBookmark} />
        </button>
      </div>
      <Link
        css={BookMarkItemBottom(theme)}
        to={`/interview-room/${bookmark.listId}`}
      >
        {bookmark.ChatGPTList.name}
      </Link>
    </div>
  );
}

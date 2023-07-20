import { useState } from 'react';
import { useTheme } from '@emotion/react';
import BookMark from './BookMark';
import MyArticle from './MyArticle';
import MyComment from './MyComment';
import { ContentContainer } from '../../styles/MyPage';

export default function MyPageContentContainer() {
  const [content, setContent] = useState<
    'BOOKMARK' | 'MYARTICLE' | 'MYCOMMENT'
  >('BOOKMARK');
  const theme = useTheme();
  return (
    <div css={ContentContainer(theme)}>
      <button onClick={() => setContent('BOOKMARK')}>북마크</button>
      <button onClick={() => setContent('MYARTICLE')}>작성한 글</button>
      <button onClick={() => setContent('MYCOMMENT')}>작성한 댓글</button>
      <div>
        {content === 'BOOKMARK' && <BookMark />}
        {content === 'MYARTICLE' && <MyArticle />}
        {content === 'MYCOMMENT' && <MyComment />}
      </div>
    </div>
  );
}

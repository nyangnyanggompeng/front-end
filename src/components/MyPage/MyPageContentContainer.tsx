import { useState } from 'react';
import { useTheme } from '@emotion/react';
import BookMark from './BookMark';
import MyArticle from './MyArticle';
import MyComment from './MyComment';
import { ContentContainer, ContentButton, Content } from '../../styles/MyPage';

export default function MyPageContentContainer() {
  const [content, setContent] = useState<
    'BOOKMARK' | 'MYARTICLE' | 'MYCOMMENT'
  >('BOOKMARK');
  const theme = useTheme();
  return (
    <div css={ContentContainer(theme)}>
      <button
        css={ContentButton(theme, content === 'BOOKMARK')}
        onClick={() => setContent('BOOKMARK')}
      >
        북마크
      </button>
      <button
        css={ContentButton(theme, content === 'MYARTICLE')}
        onClick={() => setContent('MYARTICLE')}
      >
        작성한 글
      </button>
      <button
        css={ContentButton(theme, content === 'MYCOMMENT')}
        onClick={() => setContent('MYCOMMENT')}
      >
        작성한 댓글
      </button>
      <div css={Content}>
        {content === 'BOOKMARK' && <BookMark />}
        {content === 'MYARTICLE' && <MyArticle />}
        {content === 'MYCOMMENT' && <MyComment />}
      </div>
    </div>
  );
}

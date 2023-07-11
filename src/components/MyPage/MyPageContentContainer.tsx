import { useState } from 'react';
import BookMark from './BookMark';
import MyArticle from './MyArticle';

export default function MyPageContentContainer() {
  const [content, setContent] = useState<
    'BOOKMARK' | 'MYARTICLE' | 'MYCOMMENT'
  >('BOOKMARK');
  return (
    <div>
      <button onClick={() => setContent('BOOKMARK')}>북마크</button>
      <button onClick={() => setContent('MYARTICLE')}>작성한 글</button>
      <button onClick={() => setContent('MYCOMMENT')}>작성한 댓글</button>
      <div>
        {content === 'BOOKMARK' && <BookMark />}
        {content === 'MYARTICLE' && <MyArticle />}
        {content === 'MYCOMMENT' && <div>MYCOMMENT</div>}
      </div>
    </div>
  );
}

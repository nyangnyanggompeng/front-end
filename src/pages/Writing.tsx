import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor as TuiEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { CancelModal } from '../components/Writing/CancelModal';
import { Editor } from '../components/Writing/Editor';
import {
  ArticleType,
  WritingStatusType,
} from '../types/Community/writingTypes';
import { postArticle } from '../utils/Writing/postArticle';

const statusMessage: Record<WritingStatusType, string> = {
  SUCCESS: '게시물 등록에 성공했습니다',
  BAD_REQUEST: '제목, 혹은 내용이 null 입니다.',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

export function Writing() {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const navigate = useNavigate();
  const editorRef = useRef<TuiEditor>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 뒤로가기, 새로고침, 창 끄기 등 현재 페이지를 벗어나는 경우에 경고 alert 띄우기
    window.addEventListener('beforeunload', beforeunloadHandler);
    return () => {
      window.removeEventListener('beforeunload', beforeunloadHandler);
    };
  }, []);

  function beforeunloadHandler(e: BeforeUnloadEvent) {
    e.preventDefault();
    e.returnValue = '';
  }

  function handleClick() {
    if (editorRef.current && titleRef.current) {
      const newArticle: ArticleType = {
        content: editorRef.current.getInstance().getMarkdown(),
        title: titleRef.current.value,
      };
      if (newArticle.content !== null && newArticle.title !== null) {
        postArticle(newArticle)
          .then((status: WritingStatusType) => {
            alert(statusMessage[status]);
            if (status === 'SUCCESS') navigate('/community');
          })
          .catch(() => {
            alert(statusMessage['INTERNAL_SERVER_ERROR']);
          });
      }
    }
  }

  return (
    <>
      {/* NOTE : Custom Modal은 오직 직접 취소하기 버튼을 눌러 창을 벗어나는 경우에만 사용됨. 
        대안 1 : 뒤로가기, 새로고침, 창 끄기 등 현재 페이지를 벗어나는 경우에 Custom Modal만을 띄울 수 있는 방법 찾아보기
        대안 2 : 취소하기 버튼을 누른 경우에도 Custom Modal 대신 브라우저 alert창으로 대체하기
      */}
      {cancelModalOpen && (
        <CancelModal resetModal={() => setCancelModalOpen(false)} />
      )}
      <div>글쓰기</div>
      <input type='text' placeholder='제목' ref={titleRef} />
      <Editor editorRef={editorRef} />
      <button onClick={() => setCancelModalOpen(true)}>취소하기</button>
      <button onClick={handleClick}>등록하기</button>
    </>
  );
}

export default Writing;

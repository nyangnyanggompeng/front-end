import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor as TuiEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { CancelModal } from '../components/Writing/CancelModal';
import { Editor } from '../components/Common/Editor';
import {
  ArticleType,
  WritingStatusType,
} from '../types/Community/writingTypes';
import { postArticle } from '../utils/Writing/postArticle';
import useHandleUnloadEvent from '../hooks/Article/useHandleUnloadEvent';

const statusMessage: Record<WritingStatusType, string> = {
  SUCCESS: '게시물 등록에 성공했습니다',
  BAD_REQUEST: '제목 혹은 내용이 입력되지 않았습니다.',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

function Writing() {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const navigate = useNavigate();
  const editorRef = useRef<TuiEditor>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  useHandleUnloadEvent();

  function handleClick() {
    if (editorRef.current && titleRef.current) {
      const newArticle: ArticleType = {
        content: editorRef.current.getInstance().getMarkdown(),
        title: titleRef.current.value,
      };
      if (
        newArticle.content !== null &&
        newArticle.content !== '' &&
        newArticle.title !== null &&
        newArticle.title !== ''
      ) {
        postArticle(newArticle)
          .then((status: WritingStatusType) => {
            alert(statusMessage[status]);
            if (status === 'SUCCESS') navigate('/community');
          })
          .catch(() => {
            alert(statusMessage['INTERNAL_SERVER_ERROR']);
          });
      } else alert(statusMessage['BAD_REQUEST']);
    }
  }

  return (
    <>
      {cancelModalOpen && (
        <CancelModal resetModal={() => setCancelModalOpen(false)} />
      )}
      <div>글쓰기</div>
      <input type='text' placeholder='제목' ref={titleRef} />
      <Editor editorRef={editorRef} />
      <button onClick={handleClick}>등록하기</button>
    </>
  );
}

export default Writing;

import { useState, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { CancelModal } from '../../components/Community/Writing/components/CancelModal';

export function Writing() {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const editorRef = useRef<Editor>(null);

  function handleClick() {
    if (editorRef.current) {
      console.log(editorRef.current.getInstance().getMarkdown());
    }
  }

  return (
    <>
      {cancelModalOpen && (
        <CancelModal resetModal={() => setCancelModalOpen(false)} />
      )}
      <div>글쓰기</div>
      <input type='text' placeholder='제목' />
      <Editor
        ref={editorRef}
        previewStyle='vertical'
        height='600px'
        initialEditType='wysiwyg'
        placeholder='글을 작성해주세요.' // TODO : 글자수 제한을 둘 수 있을지 확인해보기
      />
      <button onClick={() => setCancelModalOpen(true)}>취소하기</button>
      <button onClick={handleClick}>등록하기</button>
    </>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { CancelModal } from '../../components/Community/Writing/components/CancelModal';

export function Writing() {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const editorRef = useRef<Editor>(null);

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
    console.log('beforeunload');
  }

  function handleClick() {
    if (editorRef.current) {
      console.log(editorRef.current.getInstance().getMarkdown());
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

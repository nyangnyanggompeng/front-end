import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as TuiEditor } from '@toast-ui/react-editor';

interface Props {
  content: string;
  editorRef: React.MutableRefObject<any>;
}

export const Editor = ({ content, editorRef }: Props) => {
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task'],
    ['table', 'image', 'link'], // TODO : 게시판 이미지 업로드 기능 가능 여부 확인하기
    ['code'],
  ];

  return (
    <>
      {editorRef && (
        <TuiEditor
          ref={editorRef}
          initialValue={content}
          initialEditType='wysiwyg'
          hideModeSwitch={true}
          height='600px'
          usageStatistics={false}
          toolbarItems={toolbarItems}
          placeholder='내용을 입력하세요'
        />
      )}
    </>
  );
};

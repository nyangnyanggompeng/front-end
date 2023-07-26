import { useEffect } from 'react';
import { Editor as TuiEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { EditorWrapper } from '../../styles/Community';
import { useTuiDarkMode } from '../../hooks/Article';

interface Props {
  content: string;
  editorRef: React.MutableRefObject<any>;
}

export const Editor = ({ content, editorRef }: Props) => {
  useTuiDarkMode('EDITOR');

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(content);
    }
  }, [content, editorRef]);

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['code'],
  ];

  return (
    <div css={EditorWrapper}>
      {editorRef && (
        <TuiEditor
          ref={editorRef}
          initialEditType='wysiwyg'
          hideModeSwitch={true}
          height='600px'
          usageStatistics={false}
          toolbarItems={toolbarItems}
          placeholder='내용을 입력하세요'
        />
      )}
    </div>
  );
};

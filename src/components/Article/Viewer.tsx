import { useTheme } from '@emotion/react';
import { Viewer as TuiViewer } from '@toast-ui/react-editor';
import { TuiCommonStyle, ViewerWrapper } from '../../styles/Community';
import { useTuiDarkMode } from '../../hooks/Article';

type viewerProps = {
  content: string;
};

export function Viewer({ content }: viewerProps) {
  useTuiDarkMode('VIEWER');
  const theme = useTheme();
  return (
    <div css={[ViewerWrapper(theme), TuiCommonStyle]} id='viewer-component'>
      <TuiViewer initialValue={content} />
    </div>
  );
}

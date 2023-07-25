import { useTheme } from '@emotion/react';
import { Viewer as TuiViewer } from '@toast-ui/react-editor';
import { ViewerWrapper } from '../../styles/Community';
import { useIsDark } from '../../hooks/Common';

type viewerProps = {
  content: string;
};

export function Viewer({ content }: viewerProps) {
  const theme = useTheme();
  const isDark = useIsDark();
  return (
    <div css={ViewerWrapper(theme)}>
      <TuiViewer initialValue={content} />
    </div>
  );
}

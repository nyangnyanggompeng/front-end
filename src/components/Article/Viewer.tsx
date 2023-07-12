import { Viewer as TuiViewer } from '@toast-ui/react-editor';

type viewerProps = {
  content: string;
};

export function Viewer({ content }: viewerProps) {
  return <TuiViewer initialValue={content} />;
}

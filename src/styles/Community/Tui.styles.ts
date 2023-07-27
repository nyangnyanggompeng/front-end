import { Theme, css } from '@emotion/react';

export const EditorWrapper = css({
  margin: '2.7rem 0 10rem 0',
});

export const ViewerWrapper = (theme: Theme) =>
  css({
    padding: '3rem 2rem 8rem 2rem',
    borderTop: `1px solid ${theme.black}`,
    borderBottom: `1px solid ${theme.black}`,
  });

export const TuiCommonStyle = css({
  div: {
    fontSize: '1.6rem',
  },
});

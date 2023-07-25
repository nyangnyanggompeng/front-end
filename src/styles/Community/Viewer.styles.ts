import { Theme, css } from '@emotion/react';

export const ViewerWrapper = (theme: Theme) =>
  css({
    padding: '3rem 2rem 8rem 2rem',
    borderTop: `1px solid ${theme.black}`,
    borderBottom: `1px solid ${theme.black}`,
  });

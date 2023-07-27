import { Theme, css } from '@emotion/react';

export const ArticleTitleWrapper = (theme: Theme, mode: 'VIEW' | 'EDIT') =>
  css({
    borderTop: `1px solid ${mode === 'VIEW' ? theme.gray1 : theme.gray2}`,
    borderBottom: `1px solid ${theme.gray2}`,
    padding: '2rem 0',
    h3: {
      fontWeight: 400,
    },
  });

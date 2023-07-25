import { Theme, css } from '@emotion/react';

export const ArticleTitleWrapper = (theme: Theme) =>
  css({
    borderTop: `1px solid ${theme.gray2}`,
    borderBottom: `1px solid ${theme.gray2}`,
    padding: '2rem 0',
    h3: {
      fontWeight: 400,
    },
  });

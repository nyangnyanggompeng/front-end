import { css } from '@emotion/react';

export const MyArticleItemContainer = (mode: 'VIEW' | 'DELETE') =>
  css({
    display: 'grid',
    gridTemplateColumns: mode === 'VIEW' ? '1fr' : '2.8rem 1fr',
    gridGap: '1.8rem',
    alignItems: 'center',
    marginBottom: '1.25rem',
    input: {
      height: '2.8rem',
      width: '2.8rem',
    },
  });

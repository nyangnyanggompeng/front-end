import { Theme, css } from '@emotion/react';

export const MyCommentItemContainer = (mode: 'VIEW' | 'DELETE') =>
  css({
    display: 'grid',
    gridTemplateColumns: mode === 'VIEW' ? '1fr' : '2.8rem 1fr',
    gridGap: '1.8rem',
    alignItems: 'center',
    input: {
      height: '2.8rem',
      width: '2.8rem',
    },
  });

export const MyCommentItemStyle = (theme: Theme) =>
  css({
    display: 'grid',
    gridTemplateColumns: '2fr 2fr 2fr 8fr',
    gridGap: '1.1rem 3.2rem',
    padding: '2rem 2.9rem',
    borderTop: `1px solid ${theme.gray2}`,
    borderBottom: `1px solid ${theme.gray2}`,
    '.writer': {
      gridColumn: '1 / 2',
      fontSize: '1.8rem',
      fontWeight: '700',
    },
    '.date': {
      gridColumn: '2 / 3',
      fontSize: '1.8rem',
    },
    '.content': {
      gridColumn: '1 / 5',
    },
    '.postLink': {
      gridColumn: '1 / 4',
      color: theme.gray1,
    },
  });

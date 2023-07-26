import { Theme, css } from '@emotion/react';

export const CommentItemContainer = (mode?: 'VIEW' | 'DELETE') =>
  css({
    display: 'grid',
    gridTemplateColumns: mode === 'DELETE' ? '2.8rem 1fr' : '1fr',
    gridGap: '1.8rem',
    alignItems: 'center',
    input: {
      height: '2.8rem',
      width: '2.8rem',
    },
  });

export const CommentItemStyle = (theme: Theme) =>
  css({
    display: 'grid',
    gridTemplateColumns: '2fr 2fr 2fr 6fr 2fr',
    gridGap: '1.1rem 3.2rem',
    padding: '2rem 2.9rem',
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
    '.content, .edit-input': {
      gridColumn: '1 / 6',
      textArea: {
        width: '100%',
        resize: 'none',
        border: '1px solid ${theme.black}',
        borderRadius: '0.5rem',
        background: 'transparent',
        padding: '1rem',
        fontColor: theme.black,
      },
    },

    '.post-link': {
      gridColumn: '1 / 4',
      color: theme.gray1,
    },
    '.edit-btn': {
      gridColumn: '5 / 6',
      display: 'flex',
      justifyContent: 'end',
      color: theme.gray1,
      span: {
        margin: '0 0.5rem',
      },
    },
  });

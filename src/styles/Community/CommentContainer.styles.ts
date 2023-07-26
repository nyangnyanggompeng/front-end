import { Theme, css } from '@emotion/react';

export const CommentContainer = css({});

export const CommentForm = (theme: Theme) =>
  css({
    display: 'flex',
    alignContent: 'start',
    alignItems: 'start',
    borderTop: `0.1rem solid ${theme.black}`,
    borderBottom: `0.1rem solid ${theme.black}`,
    padding: '2.7rem 0',
    textArea: {
      flex: '1',
      minHeight: '10rem',
      resize: 'none',
      border: '1px solid ${theme.black}',
      borderRadius: '0.5rem',
      background: 'transparent',
      padding: '1rem',
      fontColor: theme.black,
    },
    button: {
      marginLeft: '1.2rem',
    },
  });

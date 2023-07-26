import { Theme, css } from '@emotion/react';

export const CommentContainer = css({
  '.total-comments': {
    margin: '2rem',
    fontSize: '2rem',
    fontWeight: '700',
  },
});

export const CommentListContainer = (theme: Theme) =>
  css({
    '> li:first-of-type': {
      borderTop: `1px solid ${theme.black}`,
    },
  });

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

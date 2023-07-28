import { Theme, css } from '@emotion/react';

export const PaginationContainer = css({
  display: 'flex',
  justifyContent: 'center',
  height: '3.1rem',
  margin: '7.6rem 0 4.5rem 0',
  '> *': {
    padding: '0 1rem',
  },
});

export const CurrentPageButton = (theme: Theme) =>
  css({
    backgroundColor: theme.orange1,
    color: theme.white,
    borderRadius: '0.5rem', // NOTE: small radius
  });

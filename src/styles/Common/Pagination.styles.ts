import { Theme, css } from '@emotion/react';

export const PaginationContainer = css({
  display: 'flex',
  justifyContent: 'center',
  height: '3.1rem',
  marginTop: '7.6rem',
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

import { css } from '@emotion/react';
import { Theme } from '@emotion/react';

export const PageBox = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'fit-content',
    maxWidth: '45rem',
    padding: '3.3rem 3.1rem',
    margin: '0 auto',
    border: `1px solid ${theme.black}`,
    '> *': {
      width: '100%',
    },
    h3: {
      fontSize: '1.5rem',
      margin: '0.7rem 0',
    },
  });

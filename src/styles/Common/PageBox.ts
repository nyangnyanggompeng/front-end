import { css } from '@emotion/react';
import { Theme } from '@emotion/react';

export const PageBox = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'max-content',
    maxWidth: '71.5rem',
    padding: '5.3rem 5rem',
    margin: '0 auto',
    border: `1px solid ${theme.black}`,
    '> *': {
      width: '100%',
    },
    h3: {
      fontSize: '2.4rem',
      margin: '1rem 0',
    },
  });

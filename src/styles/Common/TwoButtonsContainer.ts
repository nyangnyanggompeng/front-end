import { css } from '@emotion/react';

export const TwoButtonsContainer = css({
  display: 'flex',
  justifyContent: 'center',
  '& button:first-of-type': {
    marginRight: '1.25rem',
  },
});

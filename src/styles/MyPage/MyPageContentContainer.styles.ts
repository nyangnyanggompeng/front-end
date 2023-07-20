import { Theme, css } from '@emotion/react';

export const ContentContainer = (theme: Theme) =>
  css({
    padding: '1.8rem',
    border: `1px solid ${theme.black}`,
  });

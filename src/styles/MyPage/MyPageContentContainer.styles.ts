import { Theme, css } from '@emotion/react';

export const ContentContainer = (theme: Theme) =>
  css({
    padding: '1.8rem',
    border: `1px solid ${theme.black}`,
  });

export const ContentButton = (theme: Theme, current: boolean) =>
  css({
    marginRight: '1.8rem',
    fontSize: '1.875rem',
    fontWeight: '700',
    color: current ? theme.black : '#BBBBBB',
  });

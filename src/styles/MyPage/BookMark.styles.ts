import { css, Theme } from '@emotion/react';
import { OverflowEllipsis } from '../utils';

export const BookMarkItemContainer = (theme: Theme) =>
  css({
    border: `1px solid ${theme.black}`,
    borderRadius: '0.5rem', // NOTE: small radius
    marginBottom: '1.87rem',
    padding: '1.44rem',
  });

export const BookMarkItemTop = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '6.7rem',
  button: {
    marginLeft: '3.9em',
  },
});

export const BookMarkItemContent = css(OverflowEllipsis, {
  flex: 1,
  fontSize: '1.6rem',
});

export const BookMarkItemBottom = (theme: Theme) =>
  css(OverflowEllipsis, {
    display: 'block',
    color: theme.gray1,
    fontSize: '1.6rem',
  });

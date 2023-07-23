import { css, Theme } from '@emotion/react';

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

export const BookMarkItemContent = css({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: '1.6rem',
});

export const BookMarkItemBottom = (theme: Theme) =>
  css({
    display: 'block',
    color: theme.gray1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '1.6rem',
  });

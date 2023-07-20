import { css, Theme } from '@emotion/react';

export const BookMarkItemContainer = (theme: Theme) =>
  css({
    border: `1px solid ${theme.black}`,
    borderRadius: '0.32rem', // NOTE: small radius
    marginBottom: '1.87rem',
    padding: '1.44rem',
  });

export const BookMarkItemTop = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '4.2rem',
  button: {
    marginLeft: '2.45rem',
  },
});

export const BookMarkItemContent = css({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const BookMarkItemBottom = (theme: Theme) =>
  css({
    color: theme.gray1,
  });

import { css, Theme } from '@emotion/react';

export const ArticleItemContainer = (theme: Theme) =>
  css({
    // NOTE: Grid?
    display: 'flex',
    border: `1px solid ${theme.black}`,
    borderRadius: '0.32rem', // NOTE: small radius
    padding: '1.25rem',
    marginBottom: '1.25rem',
  });

export const ArticleItemTitle = css({
  flex: 1,
  marginRight: '4rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const ArticleItemWriter = css({
  marginRight: '4rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const ArticleItemDate = css({
  marginRight: '4rem',
});

export const ArticleItemComments = css({
  svg: {
    marginRight: '0.5rem',
  },
});

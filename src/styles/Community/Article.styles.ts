import { css, Theme } from '@emotion/react';
import { OverflowEllipsis } from '../utils';

export const ArticleItemContainer = (theme: Theme) =>
  css({
    display: 'grid',
    gridTemplateColumns: '10fr 2fr 1fr 1fr',
    gridGap: '6.5rem',
    border: `1px solid ${theme.black}`,
    borderRadius: '0.5rem', // NOTE: small radius
    padding: '1.25rem',
  });

export const ArticleItemComments = css(OverflowEllipsis, {
  svg: {
    marginRight: '0.5rem',
  },
});

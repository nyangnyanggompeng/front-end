import { css, Theme } from '@emotion/react';
import { OverflowEllipsis } from '../utils';
import { mq } from '../../theme';

export const ArticleItemContainer = (theme: Theme) =>
  css({
    display: 'grid',
    gridTemplateColumns: '9fr 2fr 2fr 1fr',
    gridGap: '4rem',
    border: `1px solid ${theme.black}`,
    borderRadius: '0.5rem', // NOTE: small radius
    padding: '1.25rem',
    [mq[0]]: {
      gridTemplateColumns: '5fr 3fr 11rem',
      gridGap: '1rem',
    },
  });

export const ArticleItemTitle = css(OverflowEllipsis, {
  [mq[0]]: {
    gridRow: '1 / 2',
    gridColumn: '1 / 3',
  },
});

export const ArticleItemDate = css(OverflowEllipsis, {
  [mq[0]]: {
    gridRow: '2 / 3',
    gridColumn: '3 / 4',
    textAlign: 'right',
  },
});

export const ArticleItemComments = css(OverflowEllipsis, {
  svg: {
    marginRight: '0.5rem',
  },
  [mq[0]]: {
    gridRow: '1 / 2',
    gridColumn: '3 / 4',
    textAlign: 'right',
  },
});

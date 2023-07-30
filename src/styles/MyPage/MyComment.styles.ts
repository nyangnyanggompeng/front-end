import { Theme, css } from '@emotion/react';

export const MyCommentListContainer = (theme: Theme) =>
  css({
    '> div:first-of-type': {
      borderTop: `1px solid ${theme.gray2}`,
    },
  });

import { Theme, css } from '@emotion/react';

export const CommunityContainer = (theme: Theme) =>
  css({
    hr: {
      margin: '5rem 0',
      backgroundColor: theme.gray2,
    },
  });

export const ButtonContainer = css({
  display: 'flex',
  justifyContent: 'end',
});

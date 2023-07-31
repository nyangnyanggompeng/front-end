import { Theme, css } from '@emotion/react';

export const InstructionStyles = css({
  textAlign: 'center',
  fontSize: '2rem',
});

export const InputStyles = (theme: Theme) =>
  css({
    marginTop: '6.5rem',
    label: {
      color: theme.gray1,
    },
  });

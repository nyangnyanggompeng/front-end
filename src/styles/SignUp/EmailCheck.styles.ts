import { css, Theme } from '@emotion/react';
import { FormContainer } from './SignUp.styles';

export const EmailContainer = (theme: Theme) =>
  css(FormContainer, {
    gridTemplateColumns:
      'repeat(auto-fill, minmax(16rem, auto) 2rem minmax(16rem, auto) minmax(14rem, auto) minmax(10.7rem, auto))',
    span: {
      textAlign: 'center',
      size: '2rem',
    },
    select: {
      border: `1px solid ${theme.gray1}`,
      backgroundColor: 'transparent',
      borderRadius: 5,
      padding: '1rem 0',
    },
  });

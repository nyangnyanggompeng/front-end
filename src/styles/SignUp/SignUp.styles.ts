import { css, Theme } from '@emotion/react';

export const SignUpSubmitButton = (theme: Theme) =>
  css({
    width: 'calc(100% - 7.8rem)',
    padding: '1.12rem 0',
    margin: '0 3.9rem',
    borderRadius: '0.3rem',
    border: `1px solid ${theme.black}`,
    fontSize: '1.125rem',
  });

export const LogoStyle = css({
  width: '13rem',
  height: '2.5rem',
  flexShrink: 0,
  marginBottom: '3.12rem',
});

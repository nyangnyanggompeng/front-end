import { css, Theme } from '@emotion/react';

export const SignUpSubmitButton = (theme: Theme) =>
  css({
    width: 'calc(100% - 6.2rem)',
    padding: '1.12rem 0',
    margin: '5.6rem 3.9rem 0 3.9rem',
    borderRadius: '0.5rem',
    border: `1px solid ${theme.black}`,
    fontSize: '1.8rem',
    fontWeight: 700,
  });

export const SignUpForm = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
});
export const LogoStyle = css({
  height: '4rem',
  objectFit: 'contain',
  marginBottom: '5rem',
});

export const ItemContainer = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  width: '100%',
  margin: '2rem 0',
});

export const FormContainer = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  width: '100%',
  gridGap: '0.5rem',
  alignItems: 'center',
  justifyContent: 'center',
  input: {
    width: 'unset',
    flex: 1,
  },
  button: {
    marginLeft: '0.45rem',
  },
});

export const StatusMessage = (theme: Theme, status: 'SUCCESS' | 'ERROR') =>
  css({
    fontSize: '1.6rem',
    color: status === 'SUCCESS' ? theme.green : theme.red,
  });

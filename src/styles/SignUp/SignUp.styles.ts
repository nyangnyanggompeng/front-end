import { css, Theme } from '@emotion/react';

export const SignUpForm = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
  '.submit-button': {
    width: 'calc(100% - 6.2rem)',
    margin: '5.6rem 0',
  },
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

export const AcceptTerms = (theme: Theme) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2rem 0',
    input: {
      width: '2.8rem',
      height: '2.8rem',
    },
    span: {
      fontSize: '1.6rem',
      marginLeft: '0.5rem',
    },
    '.required': {
      color: theme.red,
    },
  });

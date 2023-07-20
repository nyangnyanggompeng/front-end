import { Theme, css } from '@emotion/react';

export const UserInfoContainer = (theme: Theme) =>
  css({
    display: 'flex',
    padding: '2.2rem 1.56rem',
    border: `1px solid ${theme.black}`,
  });

export const UserProfilePhoto = css({
  borderRadius: '50%',
});

export const UserInfoContent = css({
  display: 'flex',
  flexDirection: 'column',
  justifyItems: 'start',
  alignItems: 'center',
  flex: '1',
  margin: '0 2rem',
  '.nickname': {
    fontSize: '1.875rem',
    fontWeight: '700',
  },
  '.email': {
    fontSize: '1rem',
  },
});

export const MenuButton = css({
  display: 'flex',
  flexDirection: 'column',
  justifyItems: 'end',
  alignContent: 'space-between',
  height: '100%',
  button: {
    marginLeft: '0.7rem',
  },
  '.edit-container': {
    display: 'flex',
    flexDirection: 'row',
  },
  '.delete-account': {
    color: '#bbb',
    fontSize: '1rem',
    textDecoration: 'underline',
  },
});

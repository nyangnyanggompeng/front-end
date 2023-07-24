import { Theme, css } from '@emotion/react';

export const UserInfoContainer = (theme: Theme) =>
  css({
    display: 'flex',
    marginBottom: '2rem',
    padding: '2.5rem 3.5rem',
    border: `1px solid ${theme.black}`,
  });

export const UserProfilePhoto = css({
  width: '13.1rem',
  height: '13.1rem',
  borderRadius: '50%',
});

export const EmptyProfilePhoto = (theme: Theme) =>
  css({
    width: '13.1rem',
    height: '13.1rem',
    borderRadius: '50%',
    backgroundColor: theme.gray1,
  });

export const UserInfoContent = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: '1',
  margin: '0 3.2rem',
  '.nickname': {
    fontSize: '3rem',
    fontWeight: '700',
  },
  '.email': {
    fontSize: '1.6rem',
  },
});

export const MenuButton = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'end',
  button: {
    marginLeft: '1.1rem',
  },
  '.edit-container': {
    display: 'flex',
    flexDirection: 'row',
  },
  '.delete-account': {
    color: '#bbb',
    fontSize: '1.6rem',
    textDecoration: 'underline',
  },
});

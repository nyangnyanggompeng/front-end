import { Theme, css } from '@emotion/react';

export const ContentContainer = (theme: Theme) =>
  css({
    padding: '3.5rem',
    border: `1px solid ${theme.black}`,
  });

export const ContentButton = (theme: Theme, current: boolean) =>
  css({
    marginRight: '2.9rem',
    fontSize: '3rem',
    fontWeight: '700',
    color: current ? theme.black : '#BBBBBB',
  });

export const ContentTotal = css({
  fontSize: '2.4rem',
  fontWeight: '700',
  marginBottom: '3rem',
});

export const Content = css({
  marginTop: '3rem',
});

export const ContentTitleContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'start',
  marginBottom: '1.45rem',
  h3: {
    flex: 1,
  },
});

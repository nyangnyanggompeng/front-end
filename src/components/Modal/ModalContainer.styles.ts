import { Theme, css } from '@emotion/react';

export const ModalOverlayStyles = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  zIndex: 1000,
  backgroundColor: 'rgba(0, 0, 0, 0.30)',
});

export const ModalContainerStyles = (theme: Theme) =>
  css({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: theme.bgColor,
    borderRadius: '0.5rem', // NOTE: small radius
    padding: '5rem',
    h3: {
      marginBottom: '5rem',
    },
  });

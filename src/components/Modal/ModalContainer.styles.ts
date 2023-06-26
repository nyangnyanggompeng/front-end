import { css } from '@emotion/react';

export const ModalOverlayStyles = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  zIndex: 1000,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

export const ModalContainerStyles = css({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#ffffff',
  borderRadius: '24px',
});

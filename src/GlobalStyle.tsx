import { Global, Theme, css } from '@emotion/react';

const style = (theme: Theme) =>
  css({
    '*': {
      margin: 0,
      padding: 0,
      font: 'inherit',
      color: 'inherit',
    },

    '*, :after, :before': {
      boxSizing: 'border-box',
      flexShrink: 0,
    },

    ':root': {
      WebkitTapHighlightColor: 'transparent',
      WebkitTextSizeAdjust: '100%',
      textSizeAdjust: '100%',
      cursor: 'default',
      lineHeight: 1.5,
      overflowWrap: 'break-word',
      wordBreak: 'break-word',
      tabSize: 4,
    },

    html: {
      fontSize: '62.5%',
    },

    body: {
      fontSize: '1.6rem',
      backgroundColor: `${theme.bgColor}`,
      color: `${theme.fontColor}`,
    },

    'img, picture, video, canvas, svg': {
      display: 'block',
      maxWidth: '100%',
    },

    button: {
      background: 'none',
      border: 0,
      cursor: 'pointer',
    },

    a: {
      textDecoration: 'none',
    },

    table: {
      borderCollapse: 'collapse',
      borderSpacing: 0,
    },

    'ul,li': {
      listStyle: 'none',
    },

    /* custom css */
    '.inner': {
      maxWidth: 1200,
      margin: '0 auto',
    },
  });

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;

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
      fontFamily: `'Noto Sans KR','Apple SD Gothic Neo', arial, sans-serif`,
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

    '.container': {
      padding: '5rem 0',
    },

    // 페이지 제목
    h2: {
      fontSize: '3.6rem',
      fontWeight: 700,
      marginBottom: '2.5rem',
    },

    // 페이지 서브타이틀
    h3: {
      fontSize: '3rem',
      fontWeight: 700,
    },

    // form 제목 등
    h4: {
      fontSize: '2.4rem',
      fontWeight: 700,
    },

    input: {
      border: `1px solid ${theme.gray1}`,
      backgroundColor: 'transparent',
      borderRadius: 5,
      padding: '1rem 1.5rem',
      width: '100%',

      '&::placeholder': {
        color: `${theme.gray2}`,
      },
    },
  });

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;

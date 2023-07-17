import { Theme } from '@emotion/react';

export const lightMode: Theme = {
  blue1: '#7ac8ec',
  blue2: '#019ac4',
  orange1: '#e87701',
  orange2: '#ec9d04',
  yellow: '#f9d283',
  green: '#88b837',
  gray1: '#aaa',
  gray2: '#ccc',
  black: '#333',
  white: '#fff',
  headFoot: '#7ac8ec',
  bgColor: '#fff',
  fontColor: '#333',
};

export const darkMode: Theme = {
  blue1: '#7ac8ec',
  blue2: '#019ac4',
  orange1: '#e87701',
  orange2: '#ec9d04',
  yellow: '#f9d283',
  green: '#88b837',
  gray1: '#aaa',
  gray2: '#ccc',
  black: '#333',
  white: '#fff',
  headFoot: '#000',
  bgColor: '#000',
  fontColor: '#eee',
};

// pc : 1008px 이상
// tablet : 1007 이하 641 이상
// mobile : 640 이하
// link : https://learn.microsoft.com/ko-kr/windows/apps/design/layout/screen-sizes-and-breakpoints-for-responsive-design
const breakpoints = [1007, 640];
export const mq = breakpoints.map(
  (bp) => `@media all and (max-width: ${bp}px)`
);

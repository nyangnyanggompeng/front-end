import { Theme, css, useTheme } from '@emotion/react';
import logo from '../../asset/logo.png';
import logoWhite from '../../asset/logo-white.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { mq } from '../../theme';

const StyledFooter = (theme: Theme) =>
  css({
    '.inner': {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    },
    backgroundColor: `${theme.headFoot}`,
    padding: '2rem 0',
    a: {
      display: 'inline-block',
      fontSize: '1.4rem',
    },
    '.logo': {
      width: '50%',
    },
    [mq[0]]: {
      a: {
        fontSize: '1.2rem',
      },
      '.inner': {
        gap: '1rem',
      },
    },
    [mq[1]]: {
      img: {
        width: '60%',
      },
    },
  });

const Footer = () => {
  const theme = useTheme();
  const isDark = useSelector((state: RootState) => state.mode);

  return (
    <footer css={StyledFooter(theme)}>
      <div className='inner'>
        <Link to='/' className='logo'>
          {isDark ? (
            <img src={logoWhite} alt='인터뷰 연구소' />
          ) : (
            <img src={logo} alt='인터뷰 연구소' />
          )}
        </Link>
        <a href='https://github.com/nyangnyanggompeng' target='_blank'>
          프로젝트 깃허브 바로가기
        </a>
      </div>
    </footer>
  );
};

export default Footer;

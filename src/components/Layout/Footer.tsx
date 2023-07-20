import { Theme, css, useTheme } from '@emotion/react';
import logo from '../../asset/logo.png';
import logoWhite from '../../asset/logo-white.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const StyledFooter = (theme: Theme) =>
  css({
    backgroundColor: `${theme.headFoot}`,
    padding: '2rem 0',
    a: {
      marginTop: '2rem',
      display: 'block',
      fontSize: '1.4rem',
    },
  });

const Footer = () => {
  const theme = useTheme();
  const isDark = useSelector((state: RootState) => state.mode);

  return (
    <footer css={StyledFooter(theme)}>
      <div className='inner'>
        <Link to='/'>
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

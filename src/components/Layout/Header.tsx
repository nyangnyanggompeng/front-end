import { Theme, css, useTheme } from '@emotion/react';
import logo from '../../asset/logo.png';
import logoWhite from '../../asset/logo-white.png';
import Button from '../Common/Button';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  faSun,
  faMoon,
  faLock,
  faLockOpen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import axios from 'axios';
import { modeChange } from '../../store/slices/modeSlices';
import { setIsLogin } from '../../store/slices/loginSlices';
import { mq } from '../../theme';
import { useState } from 'react';

const StyledHeader = (theme: Theme) =>
  css({
    backgroundColor: `${theme.headFoot}`,
    padding: '2rem 0',

    '.inner': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
    },

    '.right-box': {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: '3rem',
    },

    nav: {
      ul: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '2rem',
        gap: '3rem',

        a: {
          display: 'inline-block',
          paddingBottom: '0.5rem',
          '&.active': {
            borderBottom: `3px solid ${theme.fontColor}`,
          },
        },
      },
    },

    '.btn-mode': {
      input: {
        display: 'none',
      },
      cursor: 'pointer',
      flex: '0 0 10rem',
      height: '4rem',
      backgroundColor: `${theme.white}`,
      borderRadius: 50,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      padding: 10,

      '&:after': {
        content: "''",
        display: 'block',
        width: '3rem',
        height: '3rem',
        borderRadius: '100%',
        backgroundColor: `${theme.gray2}`,
        position: 'absolute',
        top: '50%',
        left: '0.5rem',
        transform: 'translateY(-50%)',
        transition: 'all .5s',
      },

      '&.dark': {
        backgroundColor: `${theme.black}`,
        border: `1px solid ${theme.gray2}`,

        '&:after': {
          left: 'calc(100% - 3.5rem)',
        },
      },

      svg: {
        fontSize: '2.5rem',
        '&.fa-sun': {
          color: `${theme.orange1}`,
        },
        '&.fa-moon': {
          color: `${theme.white}`,
        },
      },
    },

    '.btn-menu, .nav-bg, .mobile-menu': {
      display: 'none',
    },

    [mq[0]]: {
      '.right-box': {
        display: 'none',
      },
      '.mobile-menu': {
        position: 'absolute',
        top: 0,
        right: '-30%',
        width: '30%',
        height: '100%',
        backgroundColor: `${theme.headFoot}`,
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem 3rem 3rem',
        transition: 'all .5s',
        '&.on': {
          right: 0,
        },
        '.btns': {
          alignSelf: 'flex-start',
          fontSize: '3.5rem',
          display: 'flex',
          gap: '2rem',
          marginBottom: '5rem',
        },
        nav: {
          ul: {
            flexDirection: 'column',
          },
        },
      },
      '.nav-bg': {
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundColor: `${theme.fontColor}`,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        visibility: 'hidden',
        transition: '.5s',
        '&.on': {
          opacity: 0.5,
          visibility: 'visible',
        },
      },
      '.btn-menu': {
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'space-between',
        width: '4rem',
        height: '3rem',
        position: 'absolute',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        zIndex: 9,
        span: {
          display: 'block',
          width: '100%',
          height: 5,
          borderRadius: '5rem',
          background: `${theme.fontColor}`,
          transition: '.5s',
        },
        '&.on': {
          'span:first-of-type': {
            transform: 'rotate(45deg) translate(10px, 10px)',
          },
          'span:nth-of-type(2)': {
            opacity: 0,
          },
          'span:last-of-type': {
            transform: 'rotate(-45deg) translate(8px ,-7px)',
          },
        },
      },
    },
    [mq[1]]: {
      '.mobile-menu': {
        width: '45%',
        right: '-45%',
      },
      h1: {
        img: {
          width: '80%',
        },
      },
      '.btn-menu': {
        width: '3rem',
        height: '2.5rem',
      },
    },
  });

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.mode);
  const isLogin = useSelector((state: RootState) => state.login);
  const [isMenuOn, setIsMenuOn] = useState(false);

  const onModeChange = () => {
    dispatch(modeChange(!isDark));
  };

  const logoutHandler = async () => {
    try {
      await axios.get('/users/logout'); // TODO : 로그아웃시 쿠키 삭제 확인할것
      alert('로그아웃 되었습니다.');
      dispatch(setIsLogin(false));
      navigate('/sign-in');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert('로그아웃에 실패했습니다.');
      }
    }
  };

  return (
    <header css={StyledHeader(theme)}>
      <div className='inner'>
        <h1>
          <Link to='/'>
            {isDark ? (
              <img src={logoWhite} alt='인터뷰 연구소' />
            ) : (
              <img src={logo} alt='인터뷰 연구소' />
            )}
          </Link>
        </h1>
        <div className='right-box'>
          {isLogin && (
            <nav>
              <ul>
                <li>
                  <NavLink to='/interview-room'>인터뷰 룸</NavLink>
                </li>
                <li>
                  <NavLink to='/community'>커뮤니티</NavLink>
                </li>
                <li>
                  <NavLink to='/my-page'>마이페이지</NavLink>
                </li>
              </ul>
            </nav>
          )}
          <label className={isDark ? 'btn-mode dark' : 'btn-mode light'}>
            <input type='checkbox' checked={isDark} onChange={onModeChange} />
            <FontAwesomeIcon icon={faMoon} />
            <FontAwesomeIcon icon={faSun} />
          </label>
          {isLogin ? (
            <Button status='sub' onClick={logoutHandler}>
              로그아웃
            </Button>
          ) : (
            <Button onClick={() => navigate('/sign-in')}>로그인</Button>
          )}
        </div>
        <button
          type='button'
          className={isMenuOn ? 'btn-menu on' : 'btn-menu'}
          onClick={() => setIsMenuOn(!isMenuOn)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div
        className={isMenuOn ? 'nav-bg on' : 'nav-bg'}
        onClick={() => setIsMenuOn(!isMenuOn)}
      ></div>
      <div className={isMenuOn ? 'mobile-menu on' : 'mobile-menu'}>
        <div className='btns'>
          <button type='button' onClick={onModeChange}>
            {isDark ? (
              <FontAwesomeIcon icon={faMoon} />
            ) : (
              <FontAwesomeIcon icon={faSun} />
            )}
          </button>
          {isLogin ? (
            <button type='button' onClick={logoutHandler}>
              <FontAwesomeIcon icon={faLockOpen} />
            </button>
          ) : (
            <button type='button' onClick={() => navigate('/sign-in')}>
              <FontAwesomeIcon icon={faLock} />
            </button>
          )}
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to='/interview-room'>인터뷰 룸</NavLink>
            </li>
            <li>
              <NavLink to='/community'>커뮤니티</NavLink>
            </li>
            <li>
              <NavLink to='/my-page'>마이페이지</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

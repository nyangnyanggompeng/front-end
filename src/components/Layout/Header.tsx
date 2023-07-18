import { Theme, css, useTheme } from '@emotion/react';
import logo from '../../asset/logo.png';
import Button from '../Common/Button';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { resetUser } from '../../store/slices/profileSlices';
import axios from 'axios';

const StyledHeader = (theme: Theme) =>
  css({
    backgroundColor: `${theme.headFoot}`,
    padding: '2rem 0',

    '.inner': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    '.right-box': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    nav: {
      ul: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '2rem',
        gap: '3rem',

        a: {
          '&.active': {
            fontWeight: 'bold',
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
      margin: '0 3rem',

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
  });

type HeaderProps = {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ isDark, setIsDark }: HeaderProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const [isLogin, setIsLogin] = useState(false);

  const onChange = () => {
    setIsDark(!isDark);
  };

  const logoutHandler = async () => {
    try {
      await axios.get('/users/logout'); // TODO : 로그아웃시 쿠키 삭제 확인할것
      dispatch(resetUser());
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert('로그아웃에 실패했습니다.');
      }
    }
  };

  useEffect(() => {
    profile.data.username ? setIsLogin(true) : setIsLogin(false);
  }, [profile]);

  return (
    <header css={StyledHeader(theme)}>
      <div className='inner'>
        <h1>
          <Link to='/'>
            <img src={logo} alt='인터뷰 연구소' />
          </Link>
        </h1>
        <div className='right-box'>
          {isLogin && (
            <nav>
              <ul>
                <li>
                  <NavLink to='#'>인터뷰 룸</NavLink>
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
            <input type='checkbox' checked={isDark} onChange={onChange} />
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
      </div>
    </header>
  );
};

export default Header;

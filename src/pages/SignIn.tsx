import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Theme, css, useTheme } from '@emotion/react';
import logo from '../asset/logo.png';
import logoWhite from '../asset/logo-white.png';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Common/Button';
import { RootState } from '../store';
import { setIsLogin } from '../store/slices/loginSlices';
import { mq } from '../theme';

interface LoginInfo {
  userId: string;
  password: string;
}

type Message =
  | 'LOGIN_FAILURE'
  | 'EMAIL_OR_PASSWORD_NOT_ENTERED'
  | 'EMAIL_DOESNT_EXIST'
  | 'TOKEN_EXPIRED'
  | 'INVALID_TOKEN'
  | 'DELETED_USER'
  | 'NO_TOKEN';

const StyledSignIn = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '.signin-wrap': {
      border: `1px solid ${theme.gray2}`,
      borderRadius: 5,
      padding: '5rem',
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      img: {
        alignSelf: 'center',
        marginBottom: '3rem',
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        marginBottom: '3rem',
        '> div:first-of-type': {
          marginBottom: '2rem',
        },
        label: {
          fontWeight: 700,
          fontSize: '2rem',
          marginBottom: '0.5rem',
          display: 'block',
        },
        '.err-msg': {
          color: `${theme.red}`,
          fontSize: '1.4rem',
          marginTop: '0.5rem',
        },
        button: {
          marginTop: '3rem',
        },
      },
      '> p': {
        textAlign: 'center',
        marginBottom: '1rem',
        a: {
          color: `${theme.orange1}`,
          fontWeight: 700,
          marginLeft: '1.5rem',
        },
      },
    },
    [mq[1]]: {
      '.signin-wrap': {
        width: '80%',
        padding: '3rem',
        img: {
          width: '50%',
        },
        form: {
          label: {
            fontSize: '1.8rem',
          },
        },
      },
    },
  });

const SignIn = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDark = useSelector((state: RootState) => state.mode);

  const message: Record<Message, string> = {
    LOGIN_FAILURE: '서버 에러입니다. 잠시 후 다시 로그인 해 주세요.',
    EMAIL_OR_PASSWORD_NOT_ENTERED:
      '이메일 또는 비밀번호가 잘못 입력되었습니다.',
    EMAIL_DOESNT_EXIST: '존재하지 않는 사용자입니다.',
    TOKEN_EXPIRED: '세션이 만료되었습니다. 다시 로그인 해주세요.',
    INVALID_TOKEN: '인증되지 않은 사용자입니다. 다시 로그인 해주세요.',
    DELETED_USER: '탈퇴한 사용자입니다.',
    NO_TOKEN: '인증되지 않은 사용자입니다. 다시 로그인 해주세요.',
  };

  const [error, setError] = useState('');
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    userId: '',
    password: '',
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setLoginInfo({
      ...loginInfo,
      [id]: value,
    });
  };

  const loginRequestHandler = async () => {
    // 입력된 값 유효성 검사
    if (!loginInfo.userId || !loginInfo.password) {
      setError(message.EMAIL_OR_PASSWORD_NOT_ENTERED);
      return;
    }

    const [username, domain] = loginInfo.userId.split('@');

    const data = {
      username,
      domain,
      password: loginInfo.password,
    };

    try {
      await axios
        .post('/users/login', {
          ...data,
        })
        .then(() => {
          dispatch(setIsLogin(true));
          navigate('/interview-room');
        });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const data: Message = err.response?.data;
        setError(message[data]);
      }
    }
  };

  return (
    <main css={StyledSignIn(theme)} className='inner'>
      <div className='signin-wrap'>
        {isDark ? (
          <img src={logoWhite} alt='인터뷰 연구소' />
        ) : (
          <img src={logo} alt='인터뷰 연구소' />
        )}
        <form onSubmit={loginRequestHandler}>
          <div>
            <label htmlFor='userId'>이메일</label>
            <input
              type='text'
              id='userId'
              placeholder='abcd@email.com'
              value={loginInfo.userId}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor='password'>비밀번호</label>
            <input
              type='password'
              id='password'
              placeholder='password'
              value={loginInfo.password}
              onChange={handleOnChange}
            />
          </div>
          {error && <p className='err-msg'>{error}</p>}
          <Button onClick={loginRequestHandler}>로그인</Button>
        </form>
        <p>
          비밀번호를 잊으셨나요?<a href='#'>비밀번호 찾기</a>
        </p>
        <p>
          아직 회원이 아니신가요?<Link to='/sign-up'>회원가입</Link>
        </p>
      </div>
    </main>
  );
};

export default SignIn;

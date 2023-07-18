import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Theme, css, useTheme } from '@emotion/react';
import logo from '../asset/logo.png';
import { useDispatch } from 'react-redux';
import { getUser } from '../store/slices/profileSlices';
// import Button from '../components/Common/Button';

interface LoginInfo {
  userId: string;
  password: string;
}

interface Message {
  [key: string]: string;
}

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
          color: `${theme.orange1}`, // FIXME
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
  });

const SignIn = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // TODO : 메시지 타입 정리
  const message: Message = {
    LOGIN_SUCCESS: '',
    LOGIN_FAILURE: '이메일 또는 비밀번호가 잘못 입력되었습니다.',
    EMAIL_DOESNT_EXISTS: '존재하지 않는 사용자입니다.',
    EMAIL_OR_PASSWORD_NOT_ENTERED:
      '이메일 또는 비밀번호가 잘못 입력되었습니다.',
    SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해 주세요.',
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

  const loginRequestHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    // 액세스 토큰 발급
    await axios
      .post('/users/login', {
        ...data,
      })
      .catch((err) => {
        // TODO : 에러처리
        // 400대 에러
        if (err.response.status === 400) {
          setError(message[err.response.data]);
        }

        // 500대 에러
        if (err.response.status / 500 === 1) {
          setError(message.SERVER_ERROR);
        }
      });

    // 발급된 토큰으로 유저정보 가져오기
    await axios
      .get('/users/auth')
      .then((res) => {
        dispatch(getUser(res.data));
      })
      .catch((err) => {
        // TODO: 에러처리
        console.log(err);
      });

    navigate('/my-page');
  };

  return (
    <main css={StyledSignIn(theme)} className='inner'>
      <div className='signin-wrap'>
        <img src={logo} alt='인터뷰 연구소' />
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
          <button type='submit'>로그인</button>
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

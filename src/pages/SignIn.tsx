import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LoginInfo {
  userId: string;
  password: string;
}

interface Message {
  [key: string]: string;
}

const SignIn = () => {
  const navigate = useNavigate();
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
      .then((res) => {
        // console.log(res.data);
        console.log('토큰발급');
      })
      .catch((err) => {
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
    axios
      .get('/users/auth')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    // 필요한 페이지로 리다이렉트
    // navigate(0); // 임시
  };

  return (
    <div>
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
  );
};

export default SignIn;

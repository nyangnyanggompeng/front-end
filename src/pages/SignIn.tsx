import { useState } from 'react';
import { checkEmail, checkPw } from '../utils/userFunc';

interface User {
  email: string;
  password: string;
}

enum ErrMsg {
  None = '',
  Email = '이메일을 입력해주세요.',
  Pw = '비밀번호를 입력해주세요.',
  Both = '이메일 또는 비밀번호가 잘못 입력되었습니다.',
}

const SignIn = () => {
  const [error, setError] = useState<ErrMsg>(ErrMsg.None);
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setUser({
      ...user,
      [id]: value,
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    // 로그인 이벤트 로직
    e.preventDefault();

    // 입력된 값 유효성 검사
    if (user.email === '') {
      setError(ErrMsg.Email);
      return;
    }
    if (user.password === '') {
      setError(ErrMsg.Pw);
      return;
    }
    if (!checkEmail(user.email) || !checkPw(user.password)) {
      setError(ErrMsg.Both);
      return;
    }

    setError(ErrMsg.None);
    console.log('로그인');

    // 액세스 토큰 발급(로그인)
    // 발급된 토큰으로 유저정보 가져오기
    // 필요한 페이지로 리다이렉트
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>이메일</label>
          <input
            type='text'
            id='email'
            placeholder='abcd@email.com'
            value={user.email}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor='email'>비밀번호</label>
          <input
            type='text'
            id='password'
            placeholder='password'
            value={user.password}
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
        아직 회원이 아니신가요?<a href='#'>회원가입</a>
      </p>
    </div>
  );
};

export default SignIn;

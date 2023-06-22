import { useState } from 'react';

interface LoginInfo {
  email: string;
  password: string;
}

const SignIn = () => {
  const [error, setError] = useState(false);
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: '',
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
    // 로그인 이벤트 로직
    e.preventDefault();

    // 입력된 값 유효성 검사
    if (!loginInfo.email || !loginInfo.password) {
      setError(true);
      return;
    }

    // 액세스 토큰 발급(로그인)
    // 발급된 토큰으로 유저정보 가져오기
    // 필요한 페이지로 리다이렉트
    console.log('토큰 발급');
    console.log('유저 정보 가져와서 리덕스 툴킷으로 스토어에 저장');
    console.log('메인/gpt페이지로 리다이렉트');

    console.log('로그인');
  };

  return (
    <div>
      <form onSubmit={loginRequestHandler}>
        <div>
          <label htmlFor='email'>이메일</label>
          <input
            type='text'
            id='email'
            placeholder='abcd@email.com'
            value={loginInfo.email}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor='email'>비밀번호</label>
          <input
            type='text'
            id='password'
            placeholder='password'
            value={loginInfo.password}
            onChange={handleOnChange}
          />
        </div>
        {error && (
          <p className='err-msg'>이메일 또는 비밀번호가 잘못 입력되었습니다.</p>
        )}
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

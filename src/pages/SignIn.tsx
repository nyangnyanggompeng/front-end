import { useState } from 'react';

interface User {
  email: string;
  password: string;
}

const SignIn = () => {
  const [isError, setIsError] = useState(false);
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

  return (
    <div>
      <form>
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
        {isError && (
          <p className='err-msg'>이메일 또는 비밀번호가 잘못 입력되었습니다.</p>
        )}
        <button type='button'>로그인</button>
      </form>
      <p>
        비밀번호를 잊으셨나요?<a href='#'>비밀번호 찾기</a>
      </p>
    </div>
  );
};

export default SignIn;

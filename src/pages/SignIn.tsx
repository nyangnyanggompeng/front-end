import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginInfo {
  userId: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
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
      setError(true);
      return;
    }

    const [username, domain] = loginInfo.userId.split('@');

    const data = {
      username,
      domain,
      password: loginInfo.password,
    };

    console.log(data);

    // 액세스 토큰 발급(로그인)
    await axios
      .post('/users/login', {
        data,
      })
      .then((res) => {
        console.log(res.data);

        // const { accessToken } = res.data;
        // console.log(accessToken);
        // // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
        // axios.defaults.headers.common[
        //   'Authorization'
        // ] = `Bearer ${accessToken}`;
      })
      .catch((err) => console.log(err));

    // 발급된 토큰으로 유저정보 가져오기
    // await axios
    //   .get('/userinfo')
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));

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

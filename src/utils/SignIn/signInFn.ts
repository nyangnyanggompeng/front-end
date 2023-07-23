import axios from 'axios';

const JWT_EXPIRY_TIME = 60 * 60 * 1000; // 만료 시간 1h (24시간 밀리 초로 표현)

export const loginFn = async (
  username: string,
  domain: string,
  password: string
) => {
  // 로그인 함수 실행
  // 성공하면 로그인 성공 함수 실행
  await axios
    .post('/users/login', { username, domain, password })
    .then((res) => {
      loginSuccess(res.data);
    });
};

export const silentRefresh = async () => {
  // 리프레시 토큰 발급 받고
  // 발급받은 액세스 토큰을 다시 헤더에 저장해줌
  console.log('리프레시');

  await axios.post('/users/refresh').then((res) => loginSuccess(res.data));
};

const loginSuccess = (accessToken: string) => {
  console.log('로그인 성공');

  // 헤더에 액세스 토큰을 설정해준다
  // accessToken 설정
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  // 액세스 토큰이 만료되기 1분 전에 로그인 을 연장하게 한다
  // accessToken 만료하기 1분 전에 로그인 연장
  setTimeout(silentRefresh, JWT_EXPIRY_TIME - 60000);
};

export const getUserInfo = async () => {
  const res = await axios.get('/users/auth');
  return {
    id: res.data.id,
    username: res.data.username,
    domain: res.data.domain,
    nickname: res.data.nickname,
  };
};

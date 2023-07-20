import axios from 'axios';

const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)

export const loginFn = async (
  username: string,
  domain: string,
  password: string
) => {
  await axios
    .post('/users/login', { username, domain, password })
    .then((res) => {
      loginSuccess(res.data);
    });
};

export const silentRefresh = async () => {
  console.log('토큰 재발급');

  await axios.post('/users/refresh').then((res) => loginSuccess(res.data));
};

const loginSuccess = (accessToken: string) => {
  // accessToken 설정
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  // accessToken 만료하기 1분 전에 로그인 연장
  setTimeout(silentRefresh, JWT_EXPIRY_TIME - 60000);
};

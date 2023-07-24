import axios from 'axios';

const JWT_EXPIRY_TIME = 60 * 60 * 1000; // 만료 시간 1h (24시간 밀리 초로 표현)

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
  await axios.post('/users/refresh').then((res) => loginSuccess(res.data));
};

export const loginSuccess = (accessToken: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  setTimeout(silentRefresh, JWT_EXPIRY_TIME - 60000);
};

export const logoutFn = async () => {
  await axios.get('/users/logout');
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

import axios from 'axios';

// 로그아웃 로직
export const logoutHandler = () => {
  return axios
    .get('/logout')
    .then(() => console.log('로그아웃시 상태변경'))
    .catch(() => console.log('로그아웃 실패 로직'));
};

import axios from 'axios';

// 이메일 체크 로직
export const checkEmail = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

// 패스워드 체크 로직
export const checkPw = (pw: string): boolean => {
  const pwRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{8,12}$/;
  return pwRegex.test(pw);
};

// 로그아웃 로직
export const logoutHandler = () => {
  return axios
    .get('http://localhost:4000')
    .then((res) => console.log('로그아웃시 상태변경'))
    .catch((err) => console.log('로그아웃 실패 로직'));
};

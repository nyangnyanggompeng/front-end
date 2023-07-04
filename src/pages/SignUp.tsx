import { useState } from 'react';
import EmailCheck from '../components/SignUp/EmailCheck';
import PasswordCheck from '../components/SignUp/PasswordCheck';
import NicknameCheck from '../components/SignUp/NicknameCheck';
import {
  PasswordCheckStatus,
  signupFormType,
  signupStatusType,
} from '../types/userInfoTypes';
import { signup } from '../utils/signupFunc';

const signupResultMessage: Record<signupStatusType, string> = {
  USER_CREATED: '회원가입이 완료되었습니다.',
  EMAIL_ALREADY_EXISTS: '이미 가입된 이메일입니다.',
  NICKNAME_ALREADY_EXISTS: '이미 사용 중인 닉네임입니다.',
  INVALID_PASSWORD: '유효하지 않은 비밀번호입니다.',
  WRONG_PASSWORD: '비밀번호가 일치하지 않습니다.',
  NICKNAME_NO_ENTERED: '닉네임을 입력해주세요.',
  EMAIL_OR_PASSWORD_OR_NICKNAME_NO_ENTERED: '모든 입력을 해 주세요.',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

function SignUp() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.get('domain') === 'type')
      formData.set('domain', formData.get('domain-type') as string);
    const requestForm: signupFormType = {
      username: formData.get('username') as string,
      domain: formData.get('domain') as string,
      password: formData.get('password') as string,
      passwordVerify: formData.get('passwordVerify') as string,
      nickname: formData.get('nickname') as string,
    };
    signup(requestForm)
      .then((res: signupStatusType) => {
        alert(signupResultMessage[res]);
      })
      .catch(() => {
        alert(signupResultMessage['INTERNAL_SERVER_ERROR']);
      });
  };

  return (
    <div>
      <h1>회원 가입</h1>
      <form onSubmit={onSubmit}>
        <EmailCheck />
        <PasswordCheck />
        <NicknameCheck />
        <button type='submit'>회원 가입</button>
      </form>
    </div>
  );
}

export default SignUp;

import { useState } from 'react';
import EmailCheck from '../components/SignIn/EmailCheck';
import PasswordCheck from '../components/SignIn/PasswordCheck';
import NicknameCheck from '../components/SignIn/NicknameCheck';
import {
  EmailCheckStatus,
  PasswordCheckStatus,
  NicknameCheckStatus,
} from '../types/userInfoTypes';

function SignUp() {
  const [emailCheckStatus, setEmailCheckStatus] = useState<EmailCheckStatus>();
  const [passwordCheckStatus, setPasswordCheckStatus] =
    useState<PasswordCheckStatus>();
  const [nicknameCheckStatus, setNicknameCheckStatus] =
    useState<NicknameCheckStatus>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const domain = formData.get('domain');
    const password = formData.get('password');
    const nickname = formData.get('nickname');
    console.log(email, domain, password, nickname);
  };
  return (
    <div>
      <h1>회원 가입</h1>
      <form onSubmit={onSubmit}>
        <EmailCheck status={emailCheckStatus} />
        <PasswordCheck status={passwordCheckStatus} />
        <NicknameCheck status={nicknameCheckStatus} />
        <button type='submit'>회원 가입</button>
      </form>
    </div>
  );
}

export default SignUp;

import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import EmailCheck from '../components/SignUp/EmailCheck';
import PasswordCheck from '../components/SignUp/PasswordCheck';
import NicknameCheck from '../components/SignUp/NicknameCheck';
import { SignupFormType, SignupStatusType } from '../types/SignUp';
import { signup } from '../utils/SignUp';
import {
  logoImg,
  PageBox,
  SignUpForm,
  LogoStyle,
  AcceptTerms,
} from '../styles/SignUp';
import Button from '../components/Common/Button';

const signupResultMessage: Record<SignupStatusType, string> = {
  USER_CREATED: '회원가입이 완료되었습니다.',
  EMAIL_ALREADY_EXISTS: '이미 가입된 이메일입니다.',
  NICKNAME_ALREADY_EXISTS: '이미 사용 중인 닉네임입니다.',
  INVALID_PASSWORD: '유효하지 않은 비밀번호입니다.',
  WRONG_PASSWORD: '비밀번호가 일치하지 않습니다.',
  EMAIL_OR_PASSWORD_OR_NICKNAME_NO_ENTERED: '입력되지 않은 항목이 있습니다.',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
  EMAIL_AUTHENTICATION_FAILURE: '이메일 인증에 실패했습니다.',
};

function SignUp() {
  const theme = useTheme();
  const navigate = useNavigate();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.get('isEmailChecked') === 'FALSE') {
      alert('이메일 중복확인을 해 주세요.');
      return;
    }
    if (formData.get('isNicknameChecked') === 'FALSE') {
      alert('닉네임 중복확인을 해 주세요.');
      return;
    }
    if (formData.get('acceptTermsCheckbox') !== 'on') {
      alert('이용약관 동의는 필수입니다.');
      return;
    }
    if (formData.get('domain') === 'type')
      formData.set('domain', formData.get('domain-type') as string);
    const requestForm: SignupFormType = {
      username: formData.get('username') as string,
      domain: formData.get('domain') as string,
      password: formData.get('password') as string,
      passwordVerify: formData.get('passwordVerify') as string,
      nickname: formData.get('nickname') as string,
    };
    signup(requestForm)
      .then((res: SignupStatusType) => {
        alert(signupResultMessage[res]);
        if (res === 'USER_CREATED') navigate('/sign-in');
      })
      .catch(() => {
        alert(signupResultMessage['INTERNAL_SERVER_ERROR']);
      });
  };

  return (
    <div className='inner'>
      <div css={PageBox(theme)}>
        <h2 style={{ display: 'none' }}>회원가입</h2>
        <img src={logoImg} alt='logo' css={LogoStyle} />
        <form css={SignUpForm} onSubmit={onSubmit}>
          <EmailCheck />
          <PasswordCheck mode={'SIGN_UP'} />
          <NicknameCheck />
          <label css={AcceptTerms(theme)}>
            <input
              type='checkbox'
              name='acceptTermsCheckbox'
              id='acceptTermsCheckbox'
            />
            <span className='required'>(필수) </span>
            <span>
              인터뷰 룸 이용시 사용자가 대화한 기록이 모두 보관되는 것에
              동의합니다.
            </span>
          </label>
          <Button className='submit-button' type='submit' status='main'>
            회원 가입
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

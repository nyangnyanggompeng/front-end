import { useEffect, useState } from 'react';
import { PasswordStatusType } from '../../types/Signup/password';

// TODO : 비밀번호 규칙 확정 필요
const statusMessage: Record<PasswordStatusType, string> = {
  OK: '사용 가능한 비밀번호입니다.',
  INVALID_LENGTH: '8자 이상 12자 이하로 입력해주세요.',
  INVALID_CHARACTER:
    '영문, 숫자, 특수문자(!@#$%^&* 중 적어도 하나)를 모두 포함해야 합니다.',
  NOT_MATCHED: '비밀번호가 일치하지 않습니다.',
  MATCHED: '비밀번호가 일치합니다.',
};

function PasswordCheck() {
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // TODO - useEffect 순서 고민
  useEffect(() => {
    if (password.length < 8 || password.length > 12) {
      setMessage(statusMessage['INVALID_LENGTH']);
      return;
    }
    const specialCharRegex = /[!@#$%^&*]/g;
    const numberRegex = /[0-9]/g;
    const alphabetRegex = /[a-zA-Z]/g;
    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
    const spaceRegex = /\s/g;
    if (
      !specialCharRegex.test(password) ||
      !numberRegex.test(password) ||
      !alphabetRegex.test(password) ||
      koreanRegex.test(password) ||
      spaceRegex.test(password)
    ) {
      setMessage(statusMessage['INVALID_CHARACTER']);
      return;
    }
    setMessage(statusMessage['OK']);
  }, [password]);

  useEffect(() => {
    if (passwordCheck.length === 0) return;
    if (password !== passwordCheck) {
      setMessage(statusMessage['NOT_MATCHED']);
      return;
    }
    setMessage(statusMessage['MATCHED']);
  }, [password, passwordCheck]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const onChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPasswordCheck(value);
  };

  return (
    <div>
      <input
        type='password'
        name='password'
        placeholder='비밀번호'
        onChange={onChange}
      />
      <input
        type='password'
        name='passwordVerify'
        placeholder='비밀번호 확인'
        onChange={onChangeCheck}
      />
      {/* TODO : 메시지가 없는 경우 컴포넌트 자체는 유지시키고 hidden 속성을 추가하기 */}
      <p>{message}</p>
    </div>
  );
}

export default PasswordCheck;

import { useState } from 'react';
import { EmailCheckStatus } from '../../types/Signup/userInfoTypes';

type EmailCheckProps = {
  status?: EmailCheckStatus;
};

const statusMessage: Record<EmailCheckStatus, string> = {
  OK: '사용 가능한 이메일입니다.',
  DUPLICATED: '이미 사용 중인 이메일입니다.',
  INVALID: '이메일 형식이 올바르지 않습니다.',
};

function EmailCheck({ status }: EmailCheckProps) {
  const [domainDisabled, setDomainDisabled] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [domain, setDomain] = useState<string>('naver.com');
  const message = status ? statusMessage[status] : '';

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === 'type') {
      setDomain('');
      setDomainDisabled(false);
    } else {
      setDomain(e.target.value);
      setDomainDisabled(true);
    }
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    // TODO : 중복확인 api 호출
    console.log('이메일 중복 확인 :', email, domain);
  }

  return (
    <div>
      <input
        type='text'
        name='email'
        placeholder='이메일'
        onBlur={(e) => setEmail(e.target.value)}
      />
      <span>@</span>
      <input
        type='text'
        name='domain'
        disabled={domainDisabled}
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <select
        name='domain-list'
        onChange={handleSelect}
        defaultValue={'naver.com'}
      >
        <option value='naver.com'>naver.com</option>
        <option value='gmail.com'>gmail.com</option>
        <option value='daum.net'>daum.net</option>
        <option value='type'>직접 입력</option>
      </select>
      <p>{message}</p>
      <button onClick={handleClick}>중복 확인</button>
    </div>
  );
}

export default EmailCheck;

import { useState, useEffect } from 'react';
import {
  EmailCheckStatus,
  emailCheckRequestType,
} from '../../types/userInfoTypes';
import { emailCheck } from '../../utils/signupFunc';

const statusMessage: Record<EmailCheckStatus, string> = {
  OK: '사용 가능한 이메일입니다.',
  DUPLICATED: '이미 사용 중인 이메일입니다.',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

// TODO : 비즈니스 로직 분리 필요
function EmailCheck() {
  const [domainDisabled, setDomainDisabled] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [domain, setDomain] = useState<string>('naver.com');
  const [status, setStatus] = useState<EmailCheckStatus | null>(null);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const newMessage = status ? statusMessage[status] : '';
    setMessage(newMessage);
  }, [status]);

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
    const request: emailCheckRequestType = {
      email: email,
      domain: domain,
    };
    emailCheck(request)
      .then((res: EmailCheckStatus) => setStatus(res))
      .catch(() => setStatus('INTERNAL_SERVER_ERROR'));
  }

  return (
    <div>
      <input
        type='text'
        name='username'
        placeholder='이메일'
        onBlur={(e) => setEmail(e.target.value)}
      />
      <span>@</span>
      <input
        type='text'
        name='domain-type'
        disabled={domainDisabled}
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <select name='domain' onChange={handleSelect} defaultValue={'naver.com'}>
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

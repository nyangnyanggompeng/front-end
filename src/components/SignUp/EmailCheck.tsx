import { useState, useEffect } from 'react';
import { EmailRequestType, EmailStatusType } from '../../types/Signup/email';
import { emailCheck } from '../../utils/SignUp';

const statusMessage: Record<EmailStatusType, string> = {
  AVAILABLE_EMAIL: '사용 가능한 이메일입니다.',
  EMAIL_ALREADY_EXISTS: '이미 사용 중인 이메일입니다.',
  EMAIL_NO_ENTERED: '이메일과 도메인을 입력해주세요',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

// TODO : 비즈니스 로직 분리 필요
function EmailCheck() {
  const [domainDisabled, setDomainDisabled] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [domain, setDomain] = useState<string>('naver.com');
  const [message, setMessage] = useState<string>('');
  const [isEmailChecked, setIsEmailChecked] = useState<'TRUE' | 'FALSE'>(
    'FALSE'
  );

  useEffect(() => {
    setIsEmailChecked('FALSE');
    setMessage('');
  }, [username, domain]);

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
    const request: EmailRequestType = {
      username: username,
      domain: domain,
    };
    emailCheck(request)
      .then((res: EmailStatusType) => {
        res === 'AVAILABLE_EMAIL'
          ? setIsEmailChecked('TRUE')
          : setIsEmailChecked('FALSE');
        setMessage(statusMessage[res]);
      })
      .catch(() => {
        setIsEmailChecked('FALSE');
        setMessage(statusMessage['INTERNAL_SERVER_ERROR']);
      });
  }

  return (
    <div>
      <input
        type='text'
        name='username'
        placeholder='이메일'
        onBlur={(e) => setUsername(e.target.value)}
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
      {/* TODO : 메시지가 없는 경우 컴포넌트 자체는 유지시키고 hidden 속성을 추가하기 */}
      <p>{message}</p>
      <button onClick={handleClick}>중복 확인</button>
      <input type='hidden' name='isEmailChecked' value={isEmailChecked} />
    </div>
  );
}

export default EmailCheck;

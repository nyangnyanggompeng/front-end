import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@emotion/react';
import { EmailStatusType, EmailRequestType } from '../../types/SignUp';
import {
  EmailSendStatusType,
  EmailVerifyRequestType,
} from '../../types/SignUp/email';
import { requestCheckMail } from '../../utils/SignUp';
import { emailCheck } from '../../utils/SignUp/emailCheck';
import {
  ItemContainer,
  EmailContainer,
  StatusMessage,
} from '../../styles/SignUp';
import Button from '../Common/Button';

const statusMessage: Record<EmailStatusType, string> = {
  AVAILABLE_EMAIL: '인증이 완료되었습니다.',
  AUTHENTICATION_FAILURE: '인증번호가 일치하지 않습니다.',
  EMAIL_ALREADY_EXISTS: '이미 사용 중인 이메일입니다.',
  DELETED_USER: '탈퇴한 회원의 이메일입니다.',
  AUTHENTICATION_NUMBER_NOT_ENTERED: '인증번호를 입력해주세요.',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

const emailMessage: Record<EmailSendStatusType, string> = {
  MAIL_SEND_SUCCESS: '인증번호가 전송되었습니다.',
  EMAIL_NOT_ENTERED: '이메일을 입력해주세요.',
  MAIL_SEND_FAILURE: '인증번호 전송에 실패했습니다.',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

function EmailCheck() {
  const theme = useTheme();
  const [domainDisabled, setDomainDisabled] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [domain, setDomain] = useState<string>('naver.com');
  const [status, setStatus] = useState<
    EmailStatusType | EmailSendStatusType | null
  >(null);
  const [message, setMessage] = useState<string>('');
  const [isEmailsend, setisEmailsend] = useState<boolean>(false);
  const [isVerify, setIsVerify] = useState<'TRUE' | 'FALSE'>('FALSE');
  const authRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setisEmailsend(false);
    setIsVerify('FALSE');
    setMessage('');
    setStatus(null);
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

  function handleSendEmail(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (username === '' || domain === '') {
      setStatus('EMAIL_NOT_ENTERED');
      setMessage(emailMessage['EMAIL_NOT_ENTERED']);
      return;
    }
    const request: EmailRequestType = {
      username: username,
      domain: domain,
    };
    requestCheckMail(request)
      .then((res: EmailSendStatusType) => {
        res === 'MAIL_SEND_SUCCESS'
          ? setisEmailsend(true)
          : setisEmailsend(false);
        setStatus(res);
        setMessage(emailMessage[res]);
      })
      .catch(() => {
        setisEmailsend(false);
        setStatus('INTERNAL_SERVER_ERROR');
        setMessage(emailMessage['INTERNAL_SERVER_ERROR']);
      });
  }

  function handleVerify(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!authRef.current || authRef.current.value === '') {
      alert(emailMessage['EMAIL_NOT_ENTERED']);
      return;
    }

    const request: EmailVerifyRequestType = {
      authNumber: authRef.current.value,
    };

    emailCheck(request)
      .then((res: EmailStatusType) => {
        setStatus(res);
        setMessage(statusMessage[res]);
        setIsVerify(res === 'AVAILABLE_EMAIL' ? 'TRUE' : 'FALSE');
      })
      .catch(() => {
        setStatus('INTERNAL_SERVER_ERROR');
        setMessage(statusMessage['INTERNAL_SERVER_ERROR']);
        setIsVerify('FALSE');
      });
  }

  return (
    <div css={ItemContainer}>
      <h4>이메일</h4>
      <div css={EmailContainer(theme)}>
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
        <select
          name='domain'
          onChange={handleSelect}
          defaultValue={'naver.com'}
        >
          <option value='naver.com'>naver.com</option>
          <option value='gmail.com'>gmail.com</option>
          <option value='daum.net'>daum.net</option>
          <option value='type'>직접 입력</option>
        </select>
        <Button onClick={handleSendEmail}>인증번호 전송</Button>
        <input
          className='authNumberInput'
          disabled={!isEmailsend}
          type='text'
          placeholder='인증번호를 입력해주세요'
          ref={authRef}
        />
        <Button
          className='authNumberButton'
          status={isEmailsend ? 'main' : 'disable'}
          onClick={handleVerify}
        >
          인증번호 확인
        </Button>
        <input type='hidden' name='isVerify' value={isVerify} />
      </div>
      <p
        css={StatusMessage(
          theme,
          `${
            status === 'AVAILABLE_EMAIL' || status === 'MAIL_SEND_SUCCESS'
              ? 'SUCCESS'
              : 'ERROR'
          }`
        )}
      >
        {message ? message : ''}
      </p>
    </div>
  );
}

export default EmailCheck;

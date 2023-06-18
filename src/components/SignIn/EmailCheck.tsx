import { EmailCheckStatus } from '../../types/userInfoTypes';

type EmailCheckProps = {
  status?: EmailCheckStatus;
};

const statusMessage: Record<EmailCheckStatus, string> = {
  OK: '사용 가능한 이메일입니다.',
  DUPLICATED: '이미 사용 중인 이메일입니다.',
  INVALID: '이메일 형식이 올바르지 않습니다.',
};

function EmailCheck({ status }: EmailCheckProps) {
  const message = status ? statusMessage[status] : '';
  return (
    <div>
      <input type='text' name='email' placeholder='이메일' />
      <span>@</span>
      <select name='domain' id='domain'>
        <option value='naver.com'>naver.com</option>
        <option value='gmail.com'>gmail.com</option>
        <option value='daum.net'>daum.net</option>
      </select>
      <p>{message}</p>
      <button>중복 확인</button>
    </div>
  );
}

export default EmailCheck;

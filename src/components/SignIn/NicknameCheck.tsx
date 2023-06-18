import { NicknameCheckStatus } from '../../types/userInfoTypes';

type NicknameCheckProps = {
  status?: NicknameCheckStatus;
};

const statusMessage: Record<NicknameCheckStatus, string> = {
  OK: '사용 가능한 닉네임입니다.',
  DUPLICATED: '이미 사용 중인 닉네임입니다.',
  INVALID: '사용 불가능한 닉네임입니다.',
};

function NicknameCheck({ status }: NicknameCheckProps) {
  const message = status ? statusMessage[status] : '';
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log('닉네임 중복 확인');
  }
  return (
    <div>
      <input type='text' name='nickname' placeholder='닉네임' />
      <div>{message}</div>
      <button onClick={handleClick}>중복 확인</button>
    </div>
  );
}

export default NicknameCheck;

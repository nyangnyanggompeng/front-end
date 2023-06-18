import { NicknameCheckStatus } from '../../types/userInfoTypes';

type NicknameCheckProps = {
  status?: NicknameCheckStatus;
};

function NicknameCheck({ status }: NicknameCheckProps) {
  return (
    <div>
      <input type='text' name='nickname' placeholder='닉네임' />
      <button>중복 확인</button>
    </div>
  );
}

export default NicknameCheck;

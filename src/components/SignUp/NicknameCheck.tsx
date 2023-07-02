import { useState, useEffect } from 'react';
import {
  NicknameCheckStatus,
  nicknameCheckRequestType,
} from '../../types/userInfoTypes';

import { nicknameCheck } from '../../utils/signupFunc';

const statusMessage: Record<NicknameCheckStatus, string> = {
  OK: '사용 가능한 닉네임입니다.',
  DUPLICATED: '이미 사용 중인 닉네임입니다.',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

function NicknameCheck() {
  const [nickname, setNickname] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const request: nicknameCheckRequestType = {
      nickname: nickname,
    };
    nicknameCheck(request)
      .then((res) => setMessage(statusMessage[res]))
      .catch(() => setMessage(statusMessage['INTERNAL_SERVER_ERROR']));
  }

  return (
    <div>
      <input
        type='text'
        name='nickname'
        placeholder='닉네임'
        onBlur={(e) => setNickname(e.target.value)}
      />
      <div>{message}</div>
      <button onClick={handleClick}>중복 확인</button>
    </div>
  );
}

export default NicknameCheck;

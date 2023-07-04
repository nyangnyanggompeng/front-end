import { useState, useEffect } from 'react';
import {
  NicknameStatusType,
  NicknameRequestType,
} from '../../types/SignUp/userInfoTypes';

import { nicknameCheck } from '../../utils/SignUp';

const statusMessage: Record<NicknameStatusType, string> = {
  AVAILABLE_NICKNAME: '사용 가능한 닉네임입니다.',
  NICKNAME_ALREADY_EXISTS: '이미 사용 중인 닉네임입니다.',
  NICKNAME_NO_ENTERED: '닉네임을 입력해주세요',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

function NicknameCheck() {
  const [nickname, setNickname] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const request: NicknameRequestType = {
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

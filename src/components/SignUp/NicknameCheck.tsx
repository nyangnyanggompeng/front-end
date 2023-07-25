import { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { NicknameStatusType, NicknameRequestType } from '../../types/SignUp';
import { nicknameCheck } from '../../utils/SignUp';
import Button from '../Common/Button';
import {
  ItemContainer,
  NicknameContainer,
  StatusMessage,
} from '../../styles/SignUp';

const statusMessage: Record<NicknameStatusType, string> = {
  AVAILABLE_NICKNAME: '사용 가능한 닉네임입니다.',
  NICKNAME_ALREADY_EXISTS: '이미 사용 중인 닉네임입니다.',
  NICKNAME_NO_ENTERED: '닉네임을 입력해주세요',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

function NicknameCheck() {
  const theme = useTheme();
  const [nickname, setNickname] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<NicknameStatusType | null>(null);
  const [isNicknameChecked, setIsNicknameChecked] = useState<'TRUE' | 'FALSE'>(
    'FALSE'
  );

  useEffect(() => {
    setIsNicknameChecked('FALSE');
    setMessage('');
    setStatus(null);
  }, [nickname]);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const request: NicknameRequestType = {
      nickname: nickname,
    };
    nicknameCheck(request)
      .then((res) => {
        res === 'AVAILABLE_NICKNAME'
          ? setIsNicknameChecked('TRUE')
          : setIsNicknameChecked('FALSE');
        setMessage(statusMessage[res]);
        setStatus(res);
      })
      .catch(() => {
        setIsNicknameChecked('FALSE');
        setMessage(statusMessage['INTERNAL_SERVER_ERROR']);
        setStatus('INTERNAL_SERVER_ERROR');
      });
  }

  return (
    <div css={ItemContainer}>
      <h4>닉네임</h4>
      <div css={NicknameContainer}>
        <input
          type='text'
          name='nickname'
          placeholder='닉네임'
          onBlur={(e) => setNickname(e.target.value)}
        />
        {/* TODO : 메시지가 없는 경우 컴포넌트 자체는 유지시키고 hidden 속성을 추가하기 */}
        <Button onClick={handleClick}>중복 확인</Button>
      </div>
      <p
        css={StatusMessage(
          theme,
          `${status === 'AVAILABLE_NICKNAME' ? 'SUCCESS' : 'ERROR'}`
        )}
      >
        {message ? message : '닉네임을 입력해주세요.'}
      </p>
      <input type='hidden' name='isNicknameChecked' value={isNicknameChecked} />
    </div>
  );
}

export default NicknameCheck;

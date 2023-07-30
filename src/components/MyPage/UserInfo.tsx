import { Dispatch, SetStateAction } from 'react';
import { useTheme } from '@emotion/react';
import {
  UserInfoContainer,
  UserInfoContent,
  MenuButton,
} from '../../styles/MyPage';
import { ModalType } from '../../types/MyPage/UserInfoTypes';
import Button from '../Common/Button';
import { useUser } from '../../hooks/Common';
import { ProfilePhoto } from './ProfilePhoto';
import { getImageUrl } from '../../utils/MyPage/getImageUrl';

type UserInfoProps = {
  modalSetter: Dispatch<SetStateAction<ModalType>>;
};

export const UserInfo = ({ modalSetter }: UserInfoProps) => {
  const theme = useTheme();
  const { userInfo } = useUser();
  if (!userInfo) {
    // 에러페이지 이동
    return null;
  }
  return (
    <div css={UserInfoContainer(theme)}>
      <ProfilePhoto src={getImageUrl(userInfo.profile)} mode={'MY_PAGE'} />
      <div css={UserInfoContent}>
        <span className='nickname'>{userInfo.nickname}</span>
        <span className='email'>{`${userInfo.username}@${userInfo.domain}`}</span>
      </div>
      <div css={MenuButton}>
        <div className='edit-container'>
          <Button onClick={() => modalSetter('EDIT')}>정보 수정</Button>
          <Button onClick={() => modalSetter('CHANGEPASSWORD')}>
            비밀번호 변경
          </Button>
        </div>
        <button
          className='delete-account'
          onClick={() => modalSetter('DELETE')}
        >
          탈퇴 하기
        </button>
      </div>
    </div>
  );
};

export default UserInfo;

import { Dispatch, SetStateAction } from 'react';
import { useTheme } from '@emotion/react';
import {
  UserInfoContainer,
  UserProfilePhoto,
  UserInfoContent,
  MenuButton,
} from '../../styles/MyPage';
import { ModalType } from '../../types/MyPage/UserInfoTypes';
import Button from '../Common/Button';

type UserInfoProps = {
  modalSetter: Dispatch<SetStateAction<ModalType>>;
};

export const UserInfo = ({ modalSetter }: UserInfoProps) => {
  const theme = useTheme();
  // TODO : store에 저장되어 있는 유저 정보를 불러와서 렌더링
  // const userInfo = useSelector((state) => state.user);
  const userInfo = {
    profileImage: 'https://avatars.githubusercontent.com/u/76847245?v=4',
    email: 'pengpeng@gmail.com',
    nickName: 'pengpeng',
  };
  return (
    <div css={UserInfoContainer(theme)}>
      <img
        css={UserProfilePhoto}
        src={userInfo.profileImage}
        alt='profileImage'
        width='100px'
      />
      <div css={UserInfoContent}>
        <span className='nickname'>{userInfo.nickName}</span>
        <span className='email'>{userInfo.email}</span>
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

import { ModalPropsType } from '../Modal/ModalTypes';
import { ModalContainer } from '../Modal/ModalContainer';
import NicknameCheck from '../SignUp/NicknameCheck';
import Button from '../Common/Button';
import { BottomButtonsContainer, ProfileImageEdit } from '../../styles/MyPage';
import { ProfilePhoto } from './ProfilePhoto';
import {
  UserInfoEditRequestType,
  UserInfoEditStatusType,
} from '../../types/MyPage/UserInfoEditTypes';
import {
  updateUserInfo,
  UserInfoEditStatusTypeChecker,
} from '../../utils/MyPage/updateUserInfo';
import { useState } from 'react';

const userInfoEditStatusMessage: Record<UserInfoEditStatusType, string> = {
  UPDATE_INFO_SUCCESS: '정보가 변경되었습니다.',
  UPDATE_INFO_FAILURE: '정보 변경에 실패했습니다. 다시 시도해주세요.',
  NICKNAME_OR_PROFILE_NOT_ENTERED: '변경할 정보가 없습니다.',
  NO_EXISTING_USER: '존재하지 않는 유저입니다.',
  INVALID_USER: '유효하지 않은 유저입니다.',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

export function UserInfoEditModal({ resetModal }: ModalPropsType) {
  const [imgFile, setImgFile] = useState<string>('');

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request: UserInfoEditRequestType = {
      image: formData.get('profile-image') as File,
      nickname: formData.get('nickname')?.toString() || '',
    };
    updateUserInfo(request)
      .then((res) => {
        alert(userInfoEditStatusMessage[res]);
      })
      .catch((e: unknown) => {
        if (e instanceof Error && UserInfoEditStatusTypeChecker(e.message))
          alert(userInfoEditStatusMessage[e.message as UserInfoEditStatusType]);
        else alert(userInfoEditStatusMessage['INTERNAL_SERVER_ERROR']);
      });
  }

  function handlePreview(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImgFile(reader.result);
      }
    };
  }

  return (
    <ModalContainer resetModal={resetModal}>
      <h3>정보 수정</h3>
      <form id='edit-profile' onSubmit={onSubmit} encType='multipart/form-data'>
        <div css={ProfileImageEdit}>
          <ProfilePhoto src={imgFile} mode={'USER_INFO_EDIT'} />
          <Button>
            <label htmlFor='profile-image'>
              파일 업로드
              <input
                style={{ display: 'none' }}
                name='profile-image'
                id='profile-image'
                type='file'
                accept='image/*'
                onChange={handlePreview}
              />
            </label>
          </Button>
        </div>
        <NicknameCheck />
      </form>
      <div css={BottomButtonsContainer}>
        <Button status='sub' onClick={resetModal}>
          취소
        </Button>
        <Button form='edit-profile' type='submit'>
          정보 수정
        </Button>
      </div>
    </ModalContainer>
  );
}

export default UserInfoEditModal;

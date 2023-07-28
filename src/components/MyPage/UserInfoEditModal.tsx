import { useState, useRef } from 'react';
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

const userInfoEditStatusMessage: Record<UserInfoEditStatusType, string> = {
  UPDATE_INFO_SUCCESS: '정보가 변경되었습니다.',
  SAME_AS_PREVIOUS_NICKNAME: '이전 닉네임과 동일합니다.',
  NICKNAME_ALREADY_EXISTS: '이미 존재하는 닉네임입니다.',
  UPDATE_INFO_FAILURE: '정보 변경에 실패했습니다. 다시 시도해주세요.',
  NICKNAME_OR_PROFILE_NOT_ENTERED: '변경할 정보가 없습니다.',
  NO_EXISTING_USER: '존재하지 않는 유저입니다.',
  INVALID_USER: '유효하지 않은 유저입니다.',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

export function UserInfoEditModal({ resetModal }: ModalPropsType) {
  const [imgFile, setImgFile] = useState<string>('');
  const nicknameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  function handleUploadButtonClick() {
    if (imageRef.current) imageRef.current.click();
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

  function handleUpdate(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const request: UserInfoEditRequestType = {
      image: imageRef.current?.files?.[0] || null,
      nickname: nicknameRef.current?.value || '',
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

  return (
    <ModalContainer resetModal={resetModal}>
      <h3>정보 수정</h3>
      <div css={ProfileImageEdit}>
        <ProfilePhoto src={imgFile} mode={'USER_INFO_EDIT'} />
        <Button onClick={handleUploadButtonClick}>파일 업로드</Button>
        <input
          style={{ display: 'none' }}
          name='image'
          id='image'
          type='file'
          accept='image/*'
          onChange={handlePreview}
          ref={imageRef}
        />
      </div>
      <NicknameCheck inputRef={nicknameRef} />
      <div css={BottomButtonsContainer}>
        <Button status='sub' onClick={resetModal}>
          취소
        </Button>
        <Button onClick={handleUpdate}>정보 수정</Button>
      </div>
    </ModalContainer>
  );
}

export default UserInfoEditModal;

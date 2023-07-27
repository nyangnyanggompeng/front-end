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
  UPDATE_INFO_FAILURE: '정보 변경에 실패했습니다. 다시 시도해주세요.',
  NICKNAME_OR_PROFILE_NOT_ENTERED: '변경할 정보가 없습니다.',
  NO_EXISTING_USER: '존재하지 않는 유저입니다.',
  INVALID_USER: '유효하지 않은 유저입니다.',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

export function UserInfoEditModal({ resetModal }: ModalPropsType) {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // const profileImage = formData.get('profile-image');
    // const nickname = formData.get('nickname');
    // console.log('프로필 사진 변경', profileImage);
    // console.log('닉네임 변경', nickname);
    const request: UserInfoEditRequestType = {
      image: formData.get('profile-image') as File,
      nickname: formData.get('nickname')?.toString() || '',
    };
    updateUserInfo(request)
      .then((res) => {
        alert(userInfoEditStatusMessage[res]);
      })
      .catch((e: unknown) => {
        if (UserInfoEditStatusTypeChecker(e))
          alert(userInfoEditStatusMessage[e as UserInfoEditStatusType]);
        else alert(userInfoEditStatusMessage['INTERNAL_SERVER_ERROR']);
      });
  }

  return (
    <ModalContainer resetModal={resetModal}>
      <h3>정보 수정</h3>
      <form id='edit-profile' onSubmit={onSubmit} encType='multipart/form-data'>
        <div css={ProfileImageEdit}>
          {/* TODO: 이미지 미리보기 구현 */}
          <ProfilePhoto src='' />
          <Button>
            <label htmlFor='profile-image'>
              파일 업로드
              <input
                style={{ display: 'none' }}
                name='profile-image'
                id='profile-image'
                type='file'
                accept='image/*'
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

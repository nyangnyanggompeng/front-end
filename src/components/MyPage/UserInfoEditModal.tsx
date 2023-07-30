import { ModalPropsType } from '../Modal/ModalTypes';
import { ModalContainer } from '../Modal/ModalContainer';
import NicknameCheck from '../SignUp/NicknameCheck';
import Button from '../Common/Button';
import { BottomButtonsContainer, ProfileImageEdit } from '../../styles/MyPage';
import { ProfilePhoto } from './ProfilePhoto';

export function UserInfoEditModal({ resetModal }: ModalPropsType) {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const profileImage = formData.get('profile-image');
    const nickname = formData.get('nickname');
    console.log('프로필 사진 변경', profileImage);
    console.log('닉네임 변경', nickname);
  }

  return (
    <ModalContainer resetModal={resetModal}>
      <h3>정보 수정</h3>
      <form id='edit-profile' onSubmit={onSubmit}>
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

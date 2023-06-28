import { ModalContainer } from '../Modal/ModalContainer';
import NicknameCheck from '../SignIn/NicknameCheck';

type ModalProps = {
  resetModal: () => void;
};

export function UserInfoEditModal({ resetModal }: ModalProps) {
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
      <h1>정보 수정</h1>
      <div>프로필 사진</div>
      <form onSubmit={onSubmit}>
        <input name='profile-image' type='file' />
        <NicknameCheck />
        <button type='submit'>정보 수정</button>
      </form>
    </ModalContainer>
  );
}

export default UserInfoEditModal;

import { ModalContainer } from '../Modal/ModalContainer';
import NicknameCheck from '../SignIn/NicknameCheck';

type ModalProps = {
  resetModal: () => void;
};

export function UserInfoEditModal({ resetModal }: ModalProps) {
  return (
    <ModalContainer resetModal={resetModal}>
      <h1>정보 수정</h1>
      <div>프로필 사진</div>
      <input type='file' />
      <NicknameCheck />
      <button>정보 수정</button>
    </ModalContainer>
  );
}

export default UserInfoEditModal;

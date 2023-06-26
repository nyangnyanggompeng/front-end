import { ModalContainer } from '../Modal/ModalContainer';

type ModalProps = {
  resetModal: () => void;
};

export function ChangePasswordModal({ resetModal }: ModalProps) {
  return (
    <ModalContainer resetModal={resetModal}>
      <h1>비밀번호 변경</h1>
      <div>비밀번호를 입력해주세요.</div>
      <input type='password' />
      <button>확인</button>
      <button>취소</button>
    </ModalContainer>
  );
}

export default ChangePasswordModal;

import { ModalPropsType } from '../Modal/ModalTypes';
import { ModalContainer } from '../Modal/ModalContainer';

export function DeleteAccountModal({ resetModal }: ModalPropsType) {
  function onClick(e: React.MouseEvent<Element, MouseEvent>) {
    e.preventDefault();
    console.log('회원 탈퇴');
  }
  function onCancel(e: React.MouseEvent<Element, MouseEvent>) {
    e.preventDefault();
    console.log('회원 탈퇴 취소');
    resetModal();
  }
  return (
    <ModalContainer resetModal={resetModal}>
      <h1>회원 탈퇴</h1>
      <div>정말로 탈퇴하시겠습니까?</div>
      <button onClick={onClick}>예</button>
      <button onClick={onCancel}>아니오</button>
    </ModalContainer>
  );
}

export default DeleteAccountModal;

import { ModalPropsType } from '../Modal/ModalTypes';
import { ModalContainer } from '../Modal/ModalContainer';
import Button from '../Common/Button';
import { InstructionStyles } from '../../styles/MyPage';
import { BottomButtonsContainer } from '../../styles/MyPage';

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
      <h3>회원 탈퇴</h3>
      <div css={InstructionStyles}>
        탈퇴시 모든 인터뷰 룸, 작성한 게시글, 작성한 댓글이 삭제되며,
        <br />
        이는 복구할 수 없습니다. 그래도 탈퇴하시겠습니까?
      </div>
      <div css={BottomButtonsContainer}>
        <Button status='sub' onClick={onClick}>
          탈퇴하기
        </Button>
        <Button onClick={onCancel}>취소</Button>
      </div>
    </ModalContainer>
  );
}

export default DeleteAccountModal;

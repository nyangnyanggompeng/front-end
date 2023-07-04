import { useNavigate } from 'react-router-dom';
import { ModalContainer } from '../Modal/ModalContainer';
import { ModalPropsType } from '../Modal/ModalTypes';

export function CancelModal({ resetModal }: ModalPropsType) {
  const navigate = useNavigate();

  function onCancel() {
    resetModal();
    navigate(-1); // 뒤로 가기
  }

  return (
    <ModalContainer resetModal={resetModal}>
      <h1>글 작성 취소</h1>
      <div>작성 중인 글이 있습니다. 정말로 취소하시겠습니까?</div>
      <div>작성 중인 글은 저장되지 않습니다.</div>
      <button onClick={resetModal}>취소</button>
      <button onClick={onCancel}>확인</button>
    </ModalContainer>
  );
}

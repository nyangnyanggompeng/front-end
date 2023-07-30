import { ModalPropsType } from '../Modal/ModalTypes';
import { ModalContainer } from '../Modal/ModalContainer';
import Button from '../Common/Button';
import { BottomButtonsContainer, FormContainer } from '../../styles/MyPage';

export function ChangePasswordModal({ resetModal }: ModalPropsType) {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get('current-password');
    const password = formData.get('password');
    const passwordCheck = formData.get('password-check');
    console.log('비밀번호 변경', currentPassword, password, passwordCheck);
  }

  return (
    <ModalContainer resetModal={resetModal}>
      <h3>비밀번호 변경</h3>
      <form onSubmit={onSubmit} id='change-password' css={FormContainer}>
        <h4>현재 비밀번호</h4>
        <input name='current-password' type='password' />
        <h4>변경할 비밀번호</h4>
        <input name='password' type='password' />
        <h4>변경할 비밀번호 확인 </h4>
        <input name='password-check' type='password' />
      </form>
      <div css={BottomButtonsContainer}>
        <Button status='sub' onClick={resetModal}>
          취소
        </Button>
        <Button form='change-password' type='submit'>
          변경하기
        </Button>
      </div>
    </ModalContainer>
  );
}

export default ChangePasswordModal;

import { ModalContainer } from '../Modal/ModalContainer';

type ModalProps = {
  resetModal: () => void;
};

export function ChangePasswordModal({ resetModal }: ModalProps) {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password');
    console.log('비밀번호 변경', password);
  }

  return (
    <ModalContainer resetModal={resetModal}>
      <h1>비밀번호 변경</h1>
      <div>비밀번호를 입력해주세요.</div>
      <form onSubmit={onSubmit}>
        {/* NOTE : 현재 비밀번호를 입력해야 할 수도 있음 */}
        <input type='password' />
        {/* NOTE : 비밀번호 확인 입력이 있을수도 있음 */}
        <button type='submit'>확인</button>
      </form>
    </ModalContainer>
  );
}

export default ChangePasswordModal;

import { ModalPropsType } from '../Modal/ModalTypes';
import { ModalContainer } from '../Modal/ModalContainer';
import Button from '../Common/Button';
import { BottomButtonsContainer, FormContainer } from '../../styles/MyPage';
import {
  ChangePasswordRequestType,
  ChangePasswordStatusType,
} from '../../types/MyPage/ChangePasswordTypes';
import {
  changePassword,
  ChangePasswordStatusTypeChecker,
} from '../../utils/MyPage/changePassword';

const changePasswordStatusMessage: Record<ChangePasswordStatusType, string> = {
  RESET_PASSWORD_SUCCESS: '비밀번호가 변경되었습니다.',
  RESET_PASSWORD_FAILURE: '비밀번호 변경에 실패했습니다. 다시 시도해주세요.',
  PASSWORD_OR_PASSWORD_VERIFY_NOT_ENTERED:
    '비밀번호 또는 비밀번호 확인란이 비어있습니다.',
  PASSWORD_NOT_MATCHED: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
  CURRENT_USING_PASSWORD: '현재 사용중인 비밀번호입니다.',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

export function ChangePasswordModal({ resetModal }: ModalPropsType) {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // const currentPassword = formData.get('current-password');
    // const password = formData.get('password');
    // const passwordCheck = formData.get('password-check');
    const request: ChangePasswordRequestType = {
      // currentPassword: currentPassword === null ? '' : currentPassword.toString(),
      password: formData.get('password')?.toString() || '',
      passwordVerify: formData.get('password-check')?.toString() || '',
    };
    if (request.password === request.passwordVerify) {
      alert(changePasswordStatusMessage['PASSWORD_NOT_MATCHED']);
      return;
    }
    if (request.password === '' || request.passwordVerify === '') {
      alert(
        changePasswordStatusMessage['PASSWORD_OR_PASSWORD_VERIFY_NOT_ENTERED']
      );
      return;
    }
    changePassword(request)
      .then((res) => {
        alert(changePasswordStatusMessage[res]);
      })
      .catch((e: unknown) => {
        if (ChangePasswordStatusTypeChecker(e))
          alert(changePasswordStatusMessage[e as ChangePasswordStatusType]);
        else alert(changePasswordStatusMessage['INTERNAL_SERVER_ERROR']);
      });
  }

  return (
    <ModalContainer resetModal={resetModal}>
      <h3>비밀번호 변경</h3>
      <form onSubmit={onSubmit} id='change-password' css={FormContainer}>
        {/* <h4>현재 비밀번호</h4>
        <input name='current-password' type='password' /> */}
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

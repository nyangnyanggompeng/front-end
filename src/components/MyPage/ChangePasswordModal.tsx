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
import PasswordCheck from '../SignUp/PasswordCheck';

const changePasswordStatusMessage: Record<ChangePasswordStatusType, string> = {
  RESET_PASSWORD_SUCCESS: '비밀번호가 변경되었습니다.',
  RESET_PASSWORD_FAILURE:
    '비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.',
  PASSWORD_OR_PASSWORD_VERIFY_NOT_ENTERED: '모든 항목을 입력해주세요.',
  PASSWORD_NOT_MATCHED: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
  INVALID_CURRENT_PASSWORD: '현재 비밀번호가 일치하지 않습니다.',
  CURRENT_USING_PASSWORD: '현재 사용중인 비밀번호입니다.',
  INVALID_FORM:
    '비밀번호는 영문, 숫자, 특수문자(!@#$%^&* 중 적어도 하나)를 모두 포함해야 합니다.',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

export function ChangePasswordModal({ resetModal }: ModalPropsType) {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get('currentPassword')?.toString();
    const password = formData.get('password')?.toString();
    const passwordVerify = formData.get('passwordVerify')?.toString();
    if (!currentPassword || !password || !passwordVerify) {
      alert(
        changePasswordStatusMessage['PASSWORD_OR_PASSWORD_VERIFY_NOT_ENTERED']
      );
      return;
    }
    if (password !== passwordVerify) {
      alert(changePasswordStatusMessage['PASSWORD_NOT_MATCHED']);
      return;
    }
    const request: ChangePasswordRequestType = {
      currentPassword: currentPassword,
      password: password,
      passwordVerify: passwordVerify,
    };
    changePassword(request)
      .then((res) => {
        alert(changePasswordStatusMessage[res]);
        if (res === 'RESET_PASSWORD_SUCCESS') resetModal();
      })
      .catch((e: unknown) => {
        if (e instanceof Error && ChangePasswordStatusTypeChecker(e.message))
          alert(
            changePasswordStatusMessage[e.message as ChangePasswordStatusType]
          );
        else alert(changePasswordStatusMessage['INTERNAL_SERVER_ERROR']);
      });
  }

  return (
    <ModalContainer resetModal={resetModal}>
      <h3>비밀번호 변경</h3>
      <form onSubmit={onSubmit} id='changePasswordForm' css={FormContainer}>
        <h4>현재 비밀번호</h4>
        <input name='currentPassword' type='password' />
        <PasswordCheck mode={'CHANGE_PASSWORD'} />
      </form>
      <div css={BottomButtonsContainer}>
        <Button status='sub' onClick={resetModal}>
          취소
        </Button>
        <Button form='changePasswordForm' type='submit'>
          변경하기
        </Button>
      </div>
    </ModalContainer>
  );
}

export default ChangePasswordModal;

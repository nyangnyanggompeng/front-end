import { ModalPropsType } from '../Modal/ModalTypes';
import { ModalContainer } from '../Modal/ModalContainer';
import Button from '../Common/Button';
import { InstructionStyles, InputStyles } from '../../styles/MyPage';
import { BottomButtonsContainer } from '../../styles/MyPage';
import {
  DeleteAccountRequestType,
  DeleteAccountStatusType,
} from '../../types/MyPage/DeleteAccountTypes';
import {
  deleteAccount,
  DeleteAccountStatusTypeChecker,
} from '../../utils/MyPage/deleteAccount';

const deleteAccountStatusMessage: Record<DeleteAccountStatusType, string> = {
  DELETE_USER_SUCCESS: '회원 탈퇴가 완료되었습니다.',
  DELETE_USER_FAILURE: '회원 탈퇴에 실패했습니다. 다시 시도해주세요.',
  PASSWORD_NOT_ENTERED: '비밀번호를 입력해주세요.',
  INVALID_PASSWORD: '비밀번호가 일치하지 않습니다.',
  UNAUTHORIZED: '권한이 없습니다.',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

export function DeleteAccountModal({ resetModal }: ModalPropsType) {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request: DeleteAccountRequestType = {
      password: formData.get('password')?.toString() || '',
    };
    if (request.password === '') {
      alert(deleteAccountStatusMessage['PASSWORD_NOT_ENTERED']);
      return;
    }
    deleteAccount(request)
      .then((res) => {
        alert(deleteAccountStatusMessage[res]);
        resetModal();
      })
      .catch((e: unknown) => {
        if (DeleteAccountStatusTypeChecker(e))
          alert(deleteAccountStatusMessage[e as DeleteAccountStatusType]);
        else alert(deleteAccountStatusMessage['INTERNAL_SERVER_ERROR']);
      });
  }
  function onCancel(e: React.MouseEvent<Element, MouseEvent>) {
    e.preventDefault();
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
      <form css={InputStyles} id='delete-account-form' onSubmit={onSubmit}>
        <label>위 사항에 동의하신다면 비밀번호를 입력해주세요.</label>
        <input type='password' placeholder='비밀번호를 입력해주세요.' />
      </form>
      <div css={BottomButtonsContainer}>
        <Button form='delete-account-form' status='sub'>
          탈퇴하기
        </Button>
        <Button onClick={onCancel}>취소</Button>
      </div>
    </ModalContainer>
  );
}

export default DeleteAccountModal;

import { useState } from 'react';
import UserInfo from '../components/MyPage/UserInfo';
import DeleteAccountModal from '../components/MyPage/DeleteAccountModal';
import ChangePasswordModal from '../components/MyPage/ChangePasswordModal';
import UserInfoEditModal from '../components/MyPage/UserInfoEditModal';

type ModalType = 'DELETE' | 'EDIT' | 'CHANGEPASSWORD' | null;

export default function MyPage() {
  const [modalType, setModalType] = useState<ModalType>(null);
  return (
    <>
      {modalType === 'DELETE' && (
        <DeleteAccountModal resetModal={() => setModalType(null)} />
      )}
      {modalType === 'EDIT' && (
        <UserInfoEditModal resetModal={() => setModalType(null)} />
      )}
      {modalType === 'CHANGEPASSWORD' && (
        <ChangePasswordModal resetModal={() => setModalType(null)} />
      )}
      <div>
        <h1>MyPage</h1>
        <UserInfo email={'hihi'} nickName={'hi'} profileImage={'hih'} />
        <button onClick={() => setModalType('EDIT')}>정보 수정</button>
        <button onClick={() => setModalType('CHANGEPASSWORD')}>
          비밀번호 변경
        </button>
        {/* 북마크 */}
        <button onClick={() => setModalType('DELETE')}>회원 탈퇴</button>
      </div>
    </>
  );
}

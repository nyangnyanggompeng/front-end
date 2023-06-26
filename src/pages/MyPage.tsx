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
      <div>
        <h1>MyPage</h1>
        <UserInfo email={'hihi'} nickName={'hi'} profileImage={'hih'} />
        <button>정보 수정</button>
        <button>비밀번호 변경</button>
        {/* 북마크 */}
        <button>회원 탈퇴</button>
      </div>
    </>
  );
}

import { useState } from 'react';
import UserInfo from '../components/MyPage/UserInfo';
import DeleteAccountModal from '../components/MyPage/DeleteAccountModal';
import ChangePasswordModal from '../components/MyPage/ChangePasswordModal';
import UserInfoEditModal from '../components/MyPage/UserInfoEditModal';
import MyPageContentContainer from '../components/MyPage/MyPageContentContainer';
import { ModalType } from '../types/MyPage/UserInfoTypes';

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
      <div className='inner'>
        <h2>마이페이지</h2>
        <UserInfo modalSetter={setModalType} />
        <MyPageContentContainer />
      </div>
    </>
  );
}

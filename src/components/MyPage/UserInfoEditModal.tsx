type ModalProps = {
  resetModal: () => void;
};

export function UserInfoEditModal({ resetModal }: ModalProps) {
  return (
    <div>
      <h1>정보 수정</h1>
      <div>이메일</div>
      <input type='email' />
      <div>닉네임</div>
      <input type='text' />
      <div>프로필 사진</div>
      <input type='file' />
      <button>확인</button>
      <button>취소</button>
    </div>
  );
}

export default UserInfoEditModal;

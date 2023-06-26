type ModalProps = {
  resetModal: () => void;
};

export function DeleteAccountModal({ resetModal }: ModalProps) {
  return (
    <div>
      <h1>회원 탈퇴</h1>
      <div>정말로 탈퇴하시겠습니까?</div>
      <button>예</button>
      <button>아니오</button>
    </div>
  );
}

export default DeleteAccountModal;

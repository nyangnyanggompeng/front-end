import {
  ModalOverlayStyles,
  ModalContainerStyles,
} from './ModalContainer.styles';

type ModalProps = {
  resetModal: () => void;
  children: React.ReactNode;
};

export function ModalContainer({ resetModal, children }: ModalProps) {
  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      resetModal();
    }
  }
  return (
    <div css={ModalOverlayStyles} onClick={onClick}>
      <div css={ModalContainerStyles}>{children}</div>
    </div>
  );
}

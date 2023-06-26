import {
  ModalOverlayStyles,
  ModalContainerStyles,
} from './ModalContainer.styles';

type ModalProps = {
  resetModal: () => void;
  children: React.ReactNode;
};

export function ModalContainer({ resetModal, children }: ModalProps) {
  return (
    <div css={ModalOverlayStyles} onClick={resetModal}>
      <div css={ModalContainerStyles}>{children}</div>
    </div>
  );
}

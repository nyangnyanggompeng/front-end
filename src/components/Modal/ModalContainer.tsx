import { ModalPropsType } from './ModalTypes';
import {
  ModalOverlayStyles,
  ModalContainerStyles,
} from './ModalContainer.styles';

type ModalContainerProps = ModalPropsType & {
  children: React.ReactNode;
};

export function ModalContainer({ resetModal, children }: ModalContainerProps) {
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

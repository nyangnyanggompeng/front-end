import { Theme, css } from '@emotion/react';

// theme의 type을 Theme로 설정했더니 에러가 나서 임시로 any 타입 줌
const StyledBtn = (theme: any) =>
  css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    color: `${theme.white}`,
    borderRadius: '0.5rem',
    backgroundColor: `${theme.orange1}`,
    padding: '1rem 2rem',

    '&.sub': {
      color: `${theme.orange1}`,
      backgroundColor: `${theme.white}`,
      border: `1px solid ${theme.orange1}`,
    },

    '&.disable': {
      backgroundColor: `${theme.gray2}`,
      cursor: 'default',
    },
  });

interface BtnProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick(): void;
  status?: 'main' | 'sub' | 'disable';
}

const Button = (props: BtnProps) => {
  const { children, type = 'button', onClick, status = 'main' } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      css={StyledBtn}
      className={status}
      disabled={status === 'disable' ? true : false}
    >
      {children}
    </button>
  );
};

export default Button;
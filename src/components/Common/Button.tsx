import { Theme, css, useTheme } from '@emotion/react';
import { MouseEventHandler } from 'react';

const StyledBtn = (theme: Theme) =>
  css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    color: `${theme.white}`,
    borderRadius: '0.5rem',
    backgroundColor: `${theme.orange1}`,
    padding: '1rem 2rem',
    border: `1px solid transparent`,

    '&.sub': {
      color: `${theme.orange1}`,
      backgroundColor: 'transparent',
      borderColor: `${theme.orange1}`,
    },

    '&.disable': {
      backgroundColor: `${theme.gray2}`,
      cursor: 'default',
    },
  });

interface BtnProps {
  children: React.ReactNode;
  form?: string; // form id
  type?: 'button' | 'submit' | 'reset';
  onClick?: (() => void) | MouseEventHandler<HTMLButtonElement>;
  status?: 'main' | 'sub' | 'disable';
}

const Button = (props: BtnProps) => {
  const theme = useTheme();
  const { children, type = 'button', onClick, status = 'main' } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      css={StyledBtn(theme)}
      className={status}
      disabled={status === 'disable' ? true : false}
    >
      {children}
    </button>
  );
};

export default Button;

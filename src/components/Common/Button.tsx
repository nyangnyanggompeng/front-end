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
    transition: '0.3s',
    '&:hover': {
      backgroundColor: `${theme.orange2}`,
    },

    '&.sub': {
      color: `${theme.orange1}`,
      backgroundColor: 'transparent',
      borderColor: `${theme.orange1}`,
      '&:hover': {
        backgroundColor: `${theme.orange1}`,
        color: `${theme.white}`,
      },
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
  className?: string;
}

const Button = (props: BtnProps) => {
  const theme = useTheme();
  const { children, type = 'button', onClick, status = 'main' } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      css={StyledBtn(theme)}
      className={`${status} ${props.className}`}
      disabled={status === 'disable' ? true : false}
    >
      {children}
    </button>
  );
};

export default Button;

import { css } from '@emotion/react';
import theme from '../../theme';

const StyledBtn = css({
  display: 'inline-block',
  color: `${theme.colors.light.primary}`,
});

interface BtnProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick(): void;
}

const Button = (props: BtnProps) => {
  // 주버튼, 부버튼, 비활성화
  // 아이콘 있음 없음
  const { children, type = 'button', onClick } = props;
  return (
    <button type={type} onClick={onClick} css={StyledBtn}>
      {children}
    </button>
  );
};

export default Button;

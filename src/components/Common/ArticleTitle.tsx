import { useTheme } from '@emotion/react';
import { ArticleTitleWrapper } from '../../styles/Common';

type ArticleTitleProps = {
  title?: string;
  titleRef?: React.RefObject<HTMLInputElement>;
  mode: 'VIEW' | 'EDIT';
};

export function ArticleTitle({ title, titleRef, mode }: ArticleTitleProps) {
  const theme = useTheme();
  return (
    <div css={ArticleTitleWrapper(theme, mode)}>
      {mode === 'VIEW' ? (
        <h3>{title}</h3>
      ) : (
        <input
          type='text'
          placeholder='제목'
          ref={titleRef}
          defaultValue={title ? title : ''}
        />
      )}
    </div>
  );
}

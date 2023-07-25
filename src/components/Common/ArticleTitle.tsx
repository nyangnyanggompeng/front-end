import { useTheme } from '@emotion/react';
import { ArticleTitleWrapper } from '../../styles/Common';

type ArticleTitleProps = {
  title: string;
  mode: 'VIEW' | 'EDIT';
};

export function ArticleTitle({ title, mode }: ArticleTitleProps) {
  const theme = useTheme();
  return (
    <div css={ArticleTitleWrapper(theme)}>
      {mode === 'VIEW' ? (
        <h3>{title}</h3>
      ) : (
        <input type='text' defaultValue={title} />
      )}
    </div>
  );
}

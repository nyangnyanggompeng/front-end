import { Theme } from '@emotion/react';
import { BeatLoader } from 'react-spinners';
import { LoadingContainer } from '../../styles/Common/Loading.styles';

type LoadingProps = {
  theme: Theme;
};

export function Loading({ theme }: LoadingProps) {
  return (
    <div css={LoadingContainer}>
      <div>로딩중</div>
      <BeatLoader color={theme.green} />
    </div>
  );
}

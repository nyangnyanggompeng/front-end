import { useTheme } from '@emotion/react';
import { UserProfilePhoto, EmptyProfilePhoto } from '../../styles/MyPage';

type ProfilePhotoProps = {
  src: string;
};

export function ProfilePhoto({ src }: ProfilePhotoProps) {
  const theme = useTheme();
  return (
    <div css={UserProfilePhoto}>
      {src ? (
        <img src={src} alt='profile' />
      ) : (
        <div css={EmptyProfilePhoto(theme)} />
      )}
    </div>
  );
}

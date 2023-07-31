import { useTheme } from '@emotion/react';
import { UserProfilePhoto, EmptyProfilePhoto } from '../../styles/MyPage';

type ProfilePhotoProps = {
  src: string;
  mode: 'MY_PAGE' | 'USER_INFO_EDIT';
};

export function ProfilePhoto({ src, mode }: ProfilePhotoProps) {
  const theme = useTheme();
  return (
    <div className='profile-image' css={UserProfilePhoto(mode)}>
      {src ? (
        <img className='profile-image' src={src} alt='profile' />
      ) : (
        <div className='profile-image' css={EmptyProfilePhoto(theme)} />
      )}
    </div>
  );
}

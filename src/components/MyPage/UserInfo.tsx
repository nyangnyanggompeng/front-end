type UserInfoProps = {
  email: string;
  nickName: string;
  profileImage: string;
};

export const UserInfo = ({ email, nickName, profileImage }: UserInfoProps) => {
  return (
    <div>
      <div>{profileImage}</div>
      <div>{email}</div>
      <div>{nickName}</div>
    </div>
  );
};

export default UserInfo;

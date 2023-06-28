export const UserInfo = () => {
  // TODO : store에 저장되어 있는 유저 정보를 불러와서 렌더링
  // const userInfo = useSelector((state) => state.user);
  const userInfo = {
    profileImage: 'https://avatars.githubusercontent.com/u/76847245?v=4',
    email: 'pengpeng@gmail.com',
    nickName: 'pengpeng',
  };
  return (
    <div>
      {/* NOTE : 프로필 이미지 기능은 구현 여부 미정 */}
      <img src={userInfo.profileImage} alt='profileImage' width='100px' />
      <div>
        <span>아이디 (이메일)</span>
        <span>{userInfo.email}</span>
      </div>
      <div>
        <span>닉네임</span>
        <span>{userInfo.nickName}</span>
      </div>
    </div>
  );
};

export default UserInfo;

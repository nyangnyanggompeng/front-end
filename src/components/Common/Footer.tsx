import logo from '../../asset/logo.png';

const Footer = () => {
  return (
    <footer>
      <img src={logo} alt='인터뷰 연구소' />
      <a href='https://github.com/nyangnyanggompeng' target='_blank'>
        프로젝트 깃허브 바로가기
      </a>
    </footer>
  );
};

export default Footer;

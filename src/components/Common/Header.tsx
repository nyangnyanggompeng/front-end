import logo from '../../asset/logo.png';

const Header = () => {
  return (
    <header>
      <div className='inner'>
        <h1>
          <img src={logo} alt='인터뷰 연구소' />
        </h1>
        <div>
          <nav>
            <ul>
              <li>인터뷰 룸</li>
              <li>커뮤니티</li>
              <li>마이페이지</li>
            </ul>
          </nav>
          <button type='button'>로그인</button>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Community, MyPage, SignIn, SignUp, Writing } from './pages';

function Router() {
  return (
    // <BrowserRouter>
    <Routes>
      {/* <Route path='/' element={<Home />} /> */}
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/my-page' element={<MyPage />} />
      <Route path='/sign-in' element={<SignIn />} />
      {/* TODO : community 관련 url은 변경 예정 있습니다.. (기능 부분 모두 구현 후 합칠 때 예정)*/}
      {/* path='/community */}
      <Route path='/community' element={<Community />} />
      {/* path='/community/writing */}
      <Route path='/writing' element={<Writing />} />
    </Routes>
    // </BrowserRouter>
  );
}

export default Router;

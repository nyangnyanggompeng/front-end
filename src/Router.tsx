import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/my-page' element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

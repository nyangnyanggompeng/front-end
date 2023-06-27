import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import SignIn from './pages/SignIn';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/my-page' element={<MyPage />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import SignIn from './pages/SignIn';
import { Article } from './pages/Article';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/my-page' element={<MyPage />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/article/:id' element={<Article />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

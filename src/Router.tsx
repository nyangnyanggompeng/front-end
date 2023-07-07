import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Community, MyPage, SignIn, SignUp, Writing, Article } from './pages';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/my-page' element={<MyPage />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/community' element={<Community />} />
        <Route path='/community/:id' element={<Article />} />
        <Route path='/writing' element={<Writing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

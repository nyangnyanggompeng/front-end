import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { Community } from './pages/Community/Commumity';
import { Writing } from './pages/Community/Writing';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/community' element={<Community />} />
        <Route path='/writing' element={<Writing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

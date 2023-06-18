import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';

function Router() {
  return (
    <Routes>
      {/* <Route path='/' element={<Home />} /> */}
      <Route path='/sign-up' element={<SignUp />} />
    </Routes>
  );
}

export default Router;

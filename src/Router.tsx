import { Routes, Route } from 'react-router-dom';
import { Community, MyPage, SignIn, SignUp, Writing } from './pages';
import InterviewRoom from './pages/InterviewRoom';
import InterviewDetail from './pages/InterviewDetail';

function Router() {
  return (
    <Routes>
      {/* <Route path='/' element={<Home />} /> */}
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/my-page' element={<MyPage />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/interview-room' element={<InterviewRoom />} />
      <Route path='/interview-room/:id' element={<InterviewDetail />} />
      <Route path='/community' element={<Community />} />
      <Route path='/writing' element={<Writing />} />
    </Routes>
  );
}

export default Router;

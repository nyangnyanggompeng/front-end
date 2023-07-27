import { Routes, Route } from 'react-router-dom';
import {
  Community,
  MyPage,
  SignIn,
  SignUp,
  EditArticle,
  Article,
  InterviewRoom,
  InterviewDetail,
} from './pages';
import { CommunityLayout } from './components/Layout';

function Router() {
  return (
    <Routes>
      {/* <Route path='/' element={<Home />} /> */}
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/my-page' element={<MyPage />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/interview-room' element={<InterviewRoom />} />
      <Route path='/interview-room/:id' element={<InterviewDetail />} />
      <Route path='/community' element={<CommunityLayout />}>
        <Route path='' element={<Community />} />
        <Route path=':id' element={<Article />} />
        <Route path='edit/:id' element={<EditArticle mode='EDIT' />} />
        <Route path='writing' element={<EditArticle mode='WRITE' />} />
      </Route>
    </Routes>
  );
}

export default Router;

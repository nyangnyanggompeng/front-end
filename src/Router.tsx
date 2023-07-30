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
  Home,
  ErrorPage,
  InterviewSearch,
} from './pages';
import { CommunityLayout } from './components/Layout';
import { PrivateRoute } from './components/Util';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/' element={<PrivateRoute />}>
        <Route path='sign-up' element={<SignUp />} />
        <Route path='my-page' element={<MyPage />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='interview-room' element={<InterviewRoom />} />
        <Route path='interview-room/:id' element={<InterviewDetail />} />
        <Route path='/interview-room/search' element={<InterviewSearch />} />
        <Route path='community' element={<CommunityLayout />}>
          <Route path='' element={<Community />} />
          <Route path=':id' element={<Article />} />
          <Route path='edit/:id' element={<EditArticle mode='EDIT' />} />
          <Route path='writing' element={<EditArticle mode='WRITE' />} />
        </Route>
      </Route>
      <Route path='/error/:error' element={<ErrorPage />} />
      <Route path='/*' element={<ErrorPage />} />
    </Routes>
  );
}

export default Router;

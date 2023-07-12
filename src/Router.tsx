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

function Router() {
  return (
    <Routes>
      {/* <Route path='/' element={<Home />} /> */}
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/my-page' element={<MyPage />} />
      <Route path='/sign-in' element={<SignIn />} />
      {/* TODO : community 관련 url은 변경 예정 있습니다.. (기능 부분 모두 구현 후 합칠 때 예정)*/}
      {/* path='/community */}
      <Route path='/interview-room' element={<InterviewRoom />} />
      <Route path='/interview-room/:id' element={<InterviewDetail />} />
      <Route path='/community' element={<Community />} />
      <Route path='/community/:id' element={<Article />} />
      <Route path='/community/edit/:id' element={<EditArticle mode='EDIT' />} />
      {/* path='/community/writing */}
      <Route path='/community/writing' element={<EditArticle mode='WRITE' />} />
    </Routes>
  );
}

export default Router;

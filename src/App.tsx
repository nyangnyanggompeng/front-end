import Router from './Router';
import axios from 'axios';

function App() {
  // axios 전역 기본값 설정
  axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.withCredentials = true;

  return (
    <>
      <Router />
    </>
  );
}

export default App;

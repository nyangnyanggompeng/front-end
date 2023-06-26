import Router from './Router';
import axios from 'axios';

function App() {
  const { VITE_SERVER_URL } = import.meta.env;
  // axios 전역 기본값 설정
  axios.defaults.baseURL = VITE_SERVER_URL;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.withCredentials = true;

  return (
    <>
      <Router />
    </>
  );
}

export default App;

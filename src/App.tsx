import Router from './Router';
import axios from 'axios';

function App() {
  const { VITE_SERVER_URL } = import.meta.env;
  // axios 전역 기본값 설정
  axios.defaults.baseURL = VITE_SERVER_URL;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  // NOTE : ngrok get 요청 error 해결을 위해 추가한 헤더. 추후 삭제 필요합니다.
  axios.defaults.headers.get['ngrok-skip-browser-warning'] = '69420';
  axios.defaults.withCredentials = true;
  return (
    <>
      <Router />
    </>
  );
}

export default App;

import Router from './Router';
import axios from 'axios';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import GlobalStyle from './GlobalStyle';
import Button from './components/Common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import theme from './theme';
import { ThemeProvider } from '@emotion/react';

function App() {
  const { VITE_SERVER_URL } = import.meta.env;
  // axios 전역 기본값 설정
  axios.defaults.baseURL = VITE_SERVER_URL;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.withCredentials = true;

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router />
        <Button onClick={() => console.log('클릭이벤트')}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          룰루랄라
        </Button>
        <Header />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;

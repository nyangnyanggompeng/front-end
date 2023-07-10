import Router from './Router';
import axios from 'axios';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from '@emotion/react';
import { useState } from 'react';
import { darkMode, lightMode } from './theme';

function App() {
  const { VITE_SERVER_URL } = import.meta.env;
  // axios 전역 기본값 설정
  axios.defaults.baseURL = VITE_SERVER_URL;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.withCredentials = true;

  const [isDark, setIsDark] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <ThemeProvider theme={isDark ? darkMode : lightMode}>
        <GlobalStyle />
        <Header
          isDark={isDark}
          setIsDark={setIsDark}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
        <Router />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;

import { useState } from 'react';
import axios from 'axios';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import GlobalStyle from './GlobalStyle';
import Router from './Router';
import { darkMode, lightMode } from './theme';

const queryClient = new QueryClient();

function App() {
  const { VITE_SERVER_URL } = import.meta.env;
  // axios 전역 기본값 설정
  axios.defaults.baseURL = VITE_SERVER_URL;
  axios.defaults.headers['Content-Type'] = 'application/json';
  axios.defaults.withCredentials = true;
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <ThemeProvider theme={isDark ? darkMode : lightMode}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <Header isDark={isDark} setIsDark={setIsDark} />
          <section className='container'>
            <Router />
          </section>
          <Footer />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

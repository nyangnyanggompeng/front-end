import axios, { isAxiosError } from 'axios';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import GlobalStyle from './GlobalStyle';
import Router from './Router';
import { darkMode, lightMode } from './theme';
import { useIsDark } from './hooks/Common';
import { logoutFn, silentRefresh } from './utils/SignIn/signInFn';
import { useNavigate } from 'react-router';
// import { ErrorBoundary } from './components/Util';

const queryClient = new QueryClient();

function App() {
  const { VITE_SERVER_URL } = import.meta.env;
  const isDark = useIsDark();
  const navigate = useNavigate();

  // axios 전역 기본값 설정
  axios.defaults.baseURL = VITE_SERVER_URL;
  axios.defaults.headers['Content-Type'] = 'application/json';
  axios.defaults.withCredentials = true;

  // 응답 인터셉터 추가하기
  axios.interceptors.response.use(
    (res) => res,
    async (err) => {
      const status = err.response.status;
      if (status === 419 || status === 401) {
        silentRefresh().catch((err) => {
          if (isAxiosError(err)) {
            logoutFn();
            switch (status) {
              case 400:
                alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
                break;
              default:
                navigate(`/error/500`);
            }
            navigate('/sign-in');
          }
        });

        // 토큰 재발급 성공시
        const originalResponse = await axios.request(err.config);
        return originalResponse;
      }

      return Promise.reject(err);
    }
  );

  return (
    <>
      <ThemeProvider theme={isDark ? darkMode : lightMode}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          {/* <ErrorBoundary> */}
          <Header />
          <section className='container'>
            <Router />
          </section>
          <Footer />
          {/* </ErrorBoundary> */}
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

import axios from 'axios';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import GlobalStyle from './GlobalStyle';
import Router from './Router';
import { darkMode, lightMode } from './theme';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { useEffect } from 'react';
import { getUserInfo, logoutFn, silentRefresh } from './utils/SignIn/signInFn';
import { setUserInfo } from './store/slices/userSlices';
import { useNavigate } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  const { VITE_SERVER_URL } = import.meta.env;
  const isDark = useSelector((state: RootState) => state.mode);
  const userInfo = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // axios 전역 기본값 설정
  axios.defaults.baseURL = VITE_SERVER_URL;
  axios.defaults.headers['Content-Type'] = 'application/json';
  axios.defaults.withCredentials = true;

  const authHandler = async () => {
    if (userInfo.username === '') {
      try {
        const data = await getUserInfo();
        dispatch(setUserInfo(data));
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (
            err.response &&
            (err.response.status === 419 || err.response.status === 401)
          ) {
            silentRefresh().catch((err) => {
              if (axios.isAxiosError(err)) {
                switch (err.response && err.response.status) {
                  case 400:
                    logoutFn();
                    alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
                    break;
                  default:
                    logoutFn();
                    // alert('서버 오류입니다. 다시 로그인해주세요.');
                    navigate(`/error/${err.response?.status}`);
                }
                navigate('/sign-in');
              }
            });
          } else {
            logoutFn();
            alert('서버 에러입니다. 다시 로그인 해주세요.');
            navigate('/sign-in');
          }
        }
      }
    }
  };

  useEffect(() => {
    authHandler();
  }, []);
  return (
    <>
      <ThemeProvider theme={isDark ? darkMode : lightMode}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <Header />
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

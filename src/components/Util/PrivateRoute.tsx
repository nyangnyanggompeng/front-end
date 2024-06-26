import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/Common';
import { useDispatch } from 'react-redux';
import {
  // getUserInfo,
  logoutFn,
  silentRefresh,
} from '../../utils/SignIn/signInFn';
// import { setUserInfo } from '../../store/slices/userSlices';
import { isAxiosError } from 'axios';

export function PrivateRoute() {
  const { userInfo, error } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const authHandler = async () => {
      if (!userInfo && error) {
        // try {
        //   const data = await getUserInfo();
        //   dispatch(setUserInfo(data));
        // } catch (err: unknown) {
        if (
          isAxiosError(error) &&
          error.response &&
          (error.response.status === 419 || error.response.status === 401)
        ) {
          silentRefresh().catch((err: unknown) => {
            if (isAxiosError(err)) {
              logoutFn();
              switch (err.response && err.response.status) {
                case 400:
                  alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
                  break;
                default:
                  alert('서버 오류입니다. 다시 로그인해주세요.');
              }
              navigate('/sign-in');
            }
          });
        } else {
          logoutFn();
          alert('서버 오류입니다. 다시 로그인해주세요.');
          navigate('/sign-in');
        }
      }
      // }
    };
    authHandler();
  }, [dispatch, navigate, userInfo, error]);
  return <Outlet />;
}

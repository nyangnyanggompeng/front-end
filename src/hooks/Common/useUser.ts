// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';

// export const useUser = () => {
//   const user = useSelector((state: RootState) => state.user);
//   return user;
// };

import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../utils/SignIn/signInFn';

export const useUser = () => {
  const { data, isLoading, error } = useQuery(['user'], getUserInfo);
  const userInfo = data ? data : null;
  return { userInfo, isLoading, error };
};

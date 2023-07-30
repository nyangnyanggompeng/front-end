import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const useIsDark = () => {
  const theme = useSelector((state: RootState) => state.mode);
  return theme;
};

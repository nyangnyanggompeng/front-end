import { useQuery } from '@tanstack/react-query';
import getBookMark from '../../utils/MyPage/getBookMark';

export default function useGetBookMark(currentPage: number) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['bookmarks', currentPage],
    queryFn: () => getBookMark(currentPage),
  });
  return { isLoading, isError, error, data };
}

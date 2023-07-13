import { useQuery } from '@tanstack/react-query';
import { getMyComments } from '../../utils/MyPage/getMyComments';

export default function useGetMyComment(currentPage: number) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['myComments', currentPage],
    queryFn: () => getMyComments(currentPage),
  });

  return { isLoading, isError, error, data };
}

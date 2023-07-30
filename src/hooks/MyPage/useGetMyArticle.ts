import { useQuery } from '@tanstack/react-query';
import { getMyArticles } from '../../utils/MyPage/getMyArticles';

export default function useGetMyArticle(currentPage: number) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['myArticles', currentPage],
    queryFn: () => getMyArticles(currentPage),
  });
  return { isLoading, isError, error, data };
}

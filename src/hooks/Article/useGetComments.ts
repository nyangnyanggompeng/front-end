import { getComments } from '../../utils/Community/getComments';
import { useQuery } from '@tanstack/react-query';

export default function useGetComments(currentPage: number, postId?: string) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['comments', postId, currentPage],
    queryFn: () => getComments(currentPage, postId),
  });
  return { data, isLoading, isError, error };
}

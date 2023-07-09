import { useEffect, useState } from 'react';
import { CommentDataType } from '../../types/Community/commentTypes';
import { getComments } from '../../utils/Community/getComments';
import { useQuery } from '@tanstack/react-query';

export default function useGetComments(currentPage: number, postId?: string) {
  // const [commentData, setCommentData] = useState<CommentDataType | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!postId) {
      // setCommentData(null);
      alert('post id가 없습니다!');
      return;
    }
    // setIsLoading(true);
    // getComments(parseInt(postId), currentPage)
    //   .then((commentData: CommentDataType) => setCommentData(commentData))
    //   .catch(() => {
    //     // setCommentData(null);
    //     alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
    //   })
    //   .finally(() => setIsLoading(false));
  }, [postId, currentPage]);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['comments', postId, currentPage],
    queryFn: () => getComments(currentPage, postId),
  });

  return { data, isLoading, isError, error };
}

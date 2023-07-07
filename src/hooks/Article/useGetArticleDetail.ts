import { useState, useEffect } from 'react';
import { ArticleDetailType } from '../../types/Community/articleTypes';
import { getArticleDetail } from '../../utils/Community/getArticleDetail';

export default function useGetArticleDetail(postId: number) {
  const [articleDetail, setArticleDetail] = useState<ArticleDetailType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    getArticleDetail(postId)
      .then((detail: ArticleDetailType) => setArticleDetail(detail))
      .catch(() => alert('서버 오류입니다. 잠시 후 다시 시도해주세요.'))
      .finally(() => setIsLoading(false));
  }, [postId]);
  return { articleDetail, isLoading };
}

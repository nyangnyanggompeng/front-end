import { useState, useEffect } from 'react';
import { ArticleDetailType } from '../../types/Community/articleTypes';
import { getArticleDetail } from '../../utils/Community/getArticleDetail';

export default function useGetArticleDetail(postId?: string) {
  const [articleDetail, setArticleDetail] = useState<ArticleDetailType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!postId) {
      setArticleDetail(null);
      alert('post id가 없습니다!');
      return;
    }
    setIsLoading(true);
    getArticleDetail(parseInt(postId))
      .then((detail: ArticleDetailType) => setArticleDetail(detail))
      .catch(() => {
        setArticleDetail(null);
        alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
      })
      .finally(() => setIsLoading(false));
  }, [postId]);
  return { articleDetail, isLoading };
}

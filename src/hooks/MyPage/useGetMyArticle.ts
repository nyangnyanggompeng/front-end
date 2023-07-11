// import { useQuery } from 'react-query';
// import getMyArticles from 'src/api/getMyArticles';
import { ArticleDataType } from '../../types/MyPage/MyArticleTypes';

export default function useGetMyArticle(currentPage: number) {
  // TODO : 이후에 api 작업시에 실제 데이터로 대체할 것
  //   const { isLoading, isError, data, error } = useQuery({
  //     queryKey: ['myArticles', currentPage],
  //     queryFn: () => getMyArticles(currentPage),
  //   });
  const isLoading = false;
  const isError = false;
  const error = null;
  const myArticleData: ArticleDataType = {
    post: [
      {
        id: 1,
        title: '냥냥',
        writer: '냥냥이',
        createdAt: '2021-08-01',
        numOfComment: 3,
        userId: 1,
      },
      {
        id: 2,
        title: '멍멍',
        writer: '멍멍이',
        createdAt: '2021-08-02',
        numOfComment: 2,
        userId: 2,
      },
    ],
    numberOfPost: 2,
    totalPages: 1,
  };
  return { isLoading, isError, error, myArticleData };
}

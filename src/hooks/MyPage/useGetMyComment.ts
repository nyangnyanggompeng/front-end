// import { useQuery } from "@tanstack/react-query";
// import getMyComments from "src/api/getMyComments";
import { MyCommentDataType } from '../../types/MyPage/MyCommentTypes';

export default function useGetMyComment(currentPage: number) {
  // TODO : 이후에 api 작업시에 실제 데이터로 대체할 것
  //   const { isLoading, isError, data, error } = useQuery({
  //     queryKey: ['myComments', currentPage],
  //     queryFn: () => getMyComments(currentPage),
  //   });
  const isLoading = false;
  const isError = false;
  const error = null;
  const myCommentData: MyCommentDataType = {
    Comment: [
      {
        id: 1,
        writer: '냥냥이',
        content: '냥냥',
        createdAt: '2021-08-01',
        postId: 1,
        postTitle: '냥냥',
      },
      {
        id: 2,
        writer: '멍멍이',
        content: '멍멍',
        createdAt: '2021-08-02',
        postId: 2,
        postTitle: '멍멍',
      },
    ],
    numberOfMyComment: 2,
    totalPages: 1,
  };
  return { isLoading, isError, error, myCommentData };
}

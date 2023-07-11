// TODO : ArticleDataItemType 와 중복되는 타입. 추후에 통합 하고 삭제예정
export type MyArticleType = {
  id: number;
  title: string;
  writer: string;
  createdAt: string;
  numOfComment: number;
  userId: number;
};

// TODO : 이것도 중복되는 타입. 삭제해야 합니다.
export type ArticleDataType = {
  post: MyArticleType[];
  numberOfPost: number;
  totalPages: number;
};

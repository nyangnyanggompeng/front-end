export type ArticleType = {
  id: number;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
  numOfComment: number;
  userId: number;
};

export type ArticleDataType = {
  post: ArticleType[];
  numberOfPost: number;
  totalPages: number;
};

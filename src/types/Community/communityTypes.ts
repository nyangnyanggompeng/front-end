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
  Post: ArticleType[];
  numberOfPost: number;
  totalPages: number;
};

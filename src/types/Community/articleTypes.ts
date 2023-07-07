type ArticleInfoBaseType = {
  id: number;
  writer: string;
  title: string;
  createdAt: string;
  userId: number;
};

export type ArticleDataItemType = ArticleInfoBaseType & {
  numOfComment: number;
};

export type ArticleDataType = {
  post: ArticleDataItemType[];
  numberOfPost: number;
  totalPages: number;
};

export type ArticleDetailType = ArticleInfoBaseType & {
  content: string;
};

export type ArticleWriteType = {
  title: string;
  content: string;
};

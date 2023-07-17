type ArticleInfoBaseType = {
  id: number;
  writer: string;
  title: string;
  createdAt: string;
  userId: number;
};

export type ArticleDataItemType = ArticleInfoBaseType & {
  numberOfComment: number;
};

export type ArticleDataType = {
  Post: ArticleDataItemType[];
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

export type ArticleWriteStateType =
  | 'OK'
  | 'INTERNAL_SERVER_ERROR'
  | 'BAD_REQUEST';
export type ArticleEditErrorState = ArticleWriteStateType;

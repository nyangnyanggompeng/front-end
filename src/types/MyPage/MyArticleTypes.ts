import { ArticleDataItemType } from '../Community/articleTypes';

export type myArticlesDataType = {
  Post: ArticleDataItemType[];
  numberOfMyPost: number;
  totalPages: number;
};

export type DeleteMyArticleRequestType = {
  postIdList: number[];
};

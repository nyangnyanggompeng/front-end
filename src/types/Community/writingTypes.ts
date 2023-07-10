export type WritingStatusType =
  | 'SUCCESS'
  | 'BAD_REQUEST'
  | 'INTERNAL_SERVER_ERROR';

export type ArticleType = {
  title: string;
  content: string;
};

export type MyCommentType = {
  id: number;
  writer: string;
  content: string;
  createdAt: string;
  postId: number;
  postTitle: string;
};

export type MyCommentDataType = {
  Comment: MyCommentType[];
  numberOfMyComment: number;
  totalPages: number;
};

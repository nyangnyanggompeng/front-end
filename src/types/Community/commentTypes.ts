export type CommentType = {
  id: number;
  writer: string;
  content: string;
  createdAt: string;
  userId: number;
};

export type CommentDataType = {
  Comment: CommentType[];
  numberOfComment: number;
  totalPages: number;
};

export type CommentWriteType = {
  content: string;
};

export type CommentStatusType =
  | 'UPDATE_COMMENT_SUCCESS'
  | 'INTERNAL_SERVER_ERROR'
  | 'CONTENT_NO_ENTERED';

export type CommentType = {
  id: number;
  writer: string;
  content: string;
  createdAt: string;
  userId: number;
};

export type CommentWriteType = {
  content: string;
};

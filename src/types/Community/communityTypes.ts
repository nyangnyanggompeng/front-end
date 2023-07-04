// TODO : updateAt, createAt 확인하기
// TODO : snake_case와 camelCase 통일 얘기해보기
export type postType = {
  id: number;
  title: string;
  content: string;
  writer: string;
  updatedAt: string;
  num_of_comment: number;
  user_id: number;
};

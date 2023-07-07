import CommentList from './CommentList';

type CommentContainerProps = {
  postId?: string;
};

export default function CommentContainer({ postId }: CommentContainerProps) {
  return (
    <div>
      <CommentList postId={postId} />
      {/* TODO : 입력창 추가하기 */}
    </div>
  );
}

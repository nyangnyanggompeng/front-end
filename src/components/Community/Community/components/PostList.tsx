import { postType } from '../../../../types/communityTypes';
import { PostListItem } from './PostListItem';

type PostListProps = {
  postList: postType[];
};

export function PostList({ postList }: PostListProps) {
  if (postList.length === 0) {
    return <div>게시물이 없습니다.</div>;
  }
  return (
    <div>
      {postList.map((post) => (
        <PostListItem
          key={post.id}
          title={post.title}
          writer={post.writer}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  );
}

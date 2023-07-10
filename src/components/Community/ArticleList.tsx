import { ArticleType } from '../../types/Community/communityTypes';
import { ArticleListItem } from './ArticleListItem';

type ArticleListProps = {
  articleList: ArticleType[];
};

export function ArticleList({ articleList }: ArticleListProps) {
  if (!articleList || articleList.length === 0) {
    return <div>게시물이 없습니다.</div>;
  }
  return (
    <div>
      {articleList.map((article) => (
        <ArticleListItem
          key={article.id}
          title={article.title}
          writer={article.writer}
          createdAt={article.createdAt}
          numOfComment={article.numOfComment}
        />
      ))}
    </div>
  );
}

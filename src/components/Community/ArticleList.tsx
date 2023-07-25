import { ArticleDataItemType } from '../../types/Community/articleTypes';
import { ArticleListItem } from './ArticleListItem';
import { ArticleListContainer } from '../../styles/Community';

type ArticleListProps = {
  articleList: ArticleDataItemType[];
};

export function ArticleList({ articleList }: ArticleListProps) {
  return (
    <div css={ArticleListContainer}>
      {articleList.map((article) => (
        <ArticleListItem
          key={article.id}
          title={article.title}
          writer={article.writer}
          createdAt={article.createdAt}
          numberOfComment={article.numberOfComment}
          id={article.id}
        />
      ))}
    </div>
  );
}

import { ArticleDataItemType } from '../../types/Community/articleTypes';
import { ArticleListItem } from './ArticleListItem';
import { ArticleListContainer } from '../../styles/Community';

type ArticleListProps = {
  articleList: ArticleDataItemType[];
};

export function ArticleList({ articleList }: ArticleListProps) {
  if (articleList.length === 0)
    return (
      <div css={ArticleListContainer}>
        <div className='empty-message'>게시물이 없습니다.</div>
      </div>
    );
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

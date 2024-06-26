import { ArticleListItem } from '../Community/ArticleListItem';
import { ArticleDataItemType } from '../../types/Community/articleTypes';
import { MyArticleItemContainer } from '../../styles/MyPage/MyArticleItem.styles';

type MyArticleItemProps = {
  isDeleteMode: boolean;
  myArticle: ArticleDataItemType;
  selectHandler: (checked: boolean, id: number) => void;
};

export default function MyArticleItem({
  isDeleteMode,
  myArticle,
  selectHandler,
}: MyArticleItemProps) {
  return (
    <div css={MyArticleItemContainer(isDeleteMode ? 'DELETE' : 'VIEW')}>
      {isDeleteMode && (
        <input
          type='checkbox'
          onChange={(e) => selectHandler(e.target.checked, myArticle.id)}
        />
      )}
      <ArticleListItem
        key={myArticle.id}
        title={myArticle.title}
        writer={myArticle.writer}
        createdAt={myArticle.createdAt}
        numberOfComment={myArticle.numberOfComment}
        id={myArticle.id}
      />
    </div>
  );
}

import { ArticleListItem } from '../Community/ArticleListItem';
import { MyArticleType } from '../../types/MyPage/MyArticleTypes';

type MyArticleItemProps = {
  isDeleteMode: boolean;
  myArticle: MyArticleType;
  selectHandler: (checked: boolean, id: number) => void;
};

export default function MyArticleItem({
  isDeleteMode,
  myArticle,
  selectHandler,
}: MyArticleItemProps) {
  return (
    <div>
      <input
        style={{ visibility: isDeleteMode ? 'visible' : 'hidden' }}
        type='checkbox'
        onChange={(e) => selectHandler(e.target.checked, myArticle.id)}
      />
      <ArticleListItem
        key={myArticle.id}
        title={myArticle.title}
        writer={myArticle.writer}
        createdAt={myArticle.createdAt}
        numOfComment={myArticle.numOfComment}
      />
    </div>
  );
}

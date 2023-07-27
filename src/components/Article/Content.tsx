import { ArticleDetailType } from '../../types/Community/articleTypes';
import { Viewer } from './Viewer';
import { ArticleTitle } from '../Common';
import { ArticleInfo } from './ArticleInfo';

type ContentProps = {
  articleDetail: ArticleDetailType;
};

function Content({ articleDetail }: ContentProps) {
  return (
    <div>
      <ArticleTitle title={articleDetail.title} mode='VIEW' />
      <ArticleInfo
        writer={articleDetail.writer}
        createdAt={articleDetail.createdAt}
      />
      <Viewer content={articleDetail.content} />
    </div>
  );
}

export default Content;

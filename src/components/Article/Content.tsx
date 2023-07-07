import { ArticleDetailType } from '../../types/Community/articleTypes';
import { Viewer } from './Viewer';

type ContentProps = {
  articleDetail: ArticleDetailType;
};

function Content({ articleDetail }: ContentProps) {
  return (
    <div>
      <div>{articleDetail.title}</div>
      <div>{articleDetail.writer}</div>
      <div>{getDate(articleDetail.createdAt)}</div>
      <Viewer content={articleDetail.content} />
    </div>
  );
}

function getDate(date: string) {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  return `${year}.${month}.${day}`;
}

export default Content;

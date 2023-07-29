import { useParams } from 'react-router-dom';
import Content from '../components/Article/Content';
import { ArticleButtons } from '../components/Article/ArticleButtons';
import useGetArticleDetail from '../hooks/Article/useGetArticleDetail';
import CommentContainer from '../components/Article/CommentContainer';

function Article() {
  const { id } = useParams();
  const { articleDetail, isLoading } = useGetArticleDetail(id);

  if (isLoading) return <div>로딩중</div>;

  if (!articleDetail) return; // TODO : 에러의 경우 어떤 것을 랜더링해야 할 지 고민. 에러페이지?

  return (
    <div>
      <Content articleDetail={articleDetail} />
      <CommentContainer postId={id} />
      <ArticleButtons writerId={articleDetail.userId} postId={id} />
    </div>
  );
}

export default Article;

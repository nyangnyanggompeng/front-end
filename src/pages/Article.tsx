import { useParams } from 'react-router-dom';
import Content from '../components/Article/Content';
import { Buttons } from '../components/Article/Buttons';

function Article() {
  const { id } = useParams();

  if (!id) return <div>에러!</div>;

  return (
    <div>
      <Content postId={parseInt(id)} />
      <Buttons writerId={parseInt(id)} />
    </div>
  );
}

export default Article;

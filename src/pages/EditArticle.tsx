import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor as TuiEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '../components/Common/Editor';
import {
  ArticleWriteType,
  ArticleWriteStateType,
  ArticleEditErrorState,
} from '../types/Community/articleTypes';
import { postArticle } from '../utils/Writing/postArticle';
import { getArticleDetail } from '../utils/Community/getArticleDetail';
import useHandleUnloadEvent from '../hooks/Article/useHandleUnloadEvent';
import { ArticleDetailType } from '../types/Community/articleTypes';
import { updateArticle } from '../utils/Community/updateArticle';
import { useUser } from '../hooks/Common';

const statusMessage: Record<
  ArticleWriteStateType | 'UNAUTHORIZED' | 'BAD_ACCESS',
  string
> = {
  OK: '게시물 등록에 성공했습니다',
  BAD_REQUEST: '제목 혹은 내용이 입력되지 않았습니다.',
  INTERNAL_SERVER_ERROR: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
  UNAUTHORIZED: '권한이 없습니다.',
  BAD_ACCESS: '잘못된 접근입니다.',
};

type WritingProps = {
  mode: 'WRITE' | 'EDIT';
};

function EditArticle({ mode }: WritingProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [articleData, setArticleData] = useState<ArticleWriteType | null>(null);
  const editorRef = useRef<TuiEditor>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  useHandleUnloadEvent();

  const currentUserID = useUser().id;

  useEffect(() => {
    if (mode === 'EDIT') {
      // error case 1: EDIT mode, but id is undefined
      if (id === undefined || isNaN(parseInt(id))) {
        alert(statusMessage['BAD_ACCESS']);
        navigate('/community');
        return;
      }
      getArticleDetail(parseInt(id)).then((data: ArticleDetailType) => {
        const { title, content, userId } = data;
        // error case 2: EDIT mode, but userId is not matched
        if (!currentUserID || userId !== currentUserID) {
          alert(statusMessage['UNAUTHORIZED']);
          navigate('/community');
          return;
        }
        setArticleData({ title, content });
      });
    }
  }, [mode, id]);

  function handleClick() {
    if (editorRef.current && titleRef.current) {
      const article: ArticleWriteType = {
        content: editorRef.current.getInstance().getMarkdown(),
        title: titleRef.current.value,
      };
      if (
        article.content !== null &&
        article.content !== '' &&
        article.title !== null &&
        article.title !== ''
      ) {
        if (mode === 'WRITE') {
          postArticle(article)
            .then((status: ArticleWriteStateType) => {
              alert(statusMessage[status]);
              if (status === 'OK') navigate('/community');
            })
            .catch(() => {
              alert(statusMessage['INTERNAL_SERVER_ERROR']);
            });
          return;
        }
        // EDIT mode
        if (id === undefined || isNaN(parseInt(id))) {
          alert(statusMessage['BAD_ACCESS']);
          return;
        }
        updateArticle(article, parseInt(id))
          .then(() => {
            alert(statusMessage['OK']);
            navigate(`/community/${id}`);
          })
          .catch((err: ArticleEditErrorState) => alert(statusMessage[err]));
      } else alert(statusMessage['BAD_REQUEST']);
    }
  }

  return (
    <>
      <div>글쓰기</div>
      <input
        type='text'
        placeholder='제목'
        ref={titleRef}
        defaultValue={articleData ? articleData.title : ''}
      />
      <Editor
        editorRef={editorRef}
        content={articleData ? articleData.content : ' '}
      />
      <button onClick={handleClick}>
        {mode === 'WRITE' ? '등록하기' : '수정하기'}
      </button>
    </>
  );
}

export default EditArticle;

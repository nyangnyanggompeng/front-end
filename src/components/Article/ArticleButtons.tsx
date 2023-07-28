import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteArticle } from '../../utils/Community/deleteArticle';
import { useUser } from '../../hooks/Common';
import { ArticleButtonsContainer } from '../../styles/Community';
import Button from '../Common/Button';

type ButtonsProps = {
  writerId: number;
  postId: string | undefined;
};

export function ArticleButtons({ writerId, postId }: ButtonsProps) {
  const navigate = useNavigate();
  const [isWriter, setIsWriter] = useState(false);
  const userId = useUser().id;
  useEffect(() => {
    if (userId && userId === writerId) setIsWriter(true);
    else setIsWriter(false);
  }, [userId, writerId]);

  function onDeleteHander(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    deleteArticle(postId)
      .then(() => {
        alert('게시글 삭제에 성공했습니다.');
        navigate('/community');
      })
      .catch(() => {
        alert('게시글 삭제에 실패했습니다.');
      });
  }

  return (
    <div css={ArticleButtonsContainer}>
      {isWriter && <Button onClick={onDeleteHander}>삭제하기</Button>}
      {isWriter && (
        <Button onClick={() => navigate(`/community/edit/${postId}`)}>
          수정하기
        </Button>
      )}
      <Button onClick={() => navigate('/community')}>목록으로</Button>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteArticle } from '../../utils/Community/deleteArticle';

type ButtonsProps = {
  writerId: number;
  postId: string | undefined;
};

export function Buttons({ writerId, postId }: ButtonsProps) {
  const navigate = useNavigate();
  const [isWriter, setIsWriter] = useState(false);
  // ANCHOR : 테스트 유저 id, 기본적인 테스트는 17로 진행함
  const userId = 17;
  useEffect(() => {
    if (userId === writerId) setIsWriter(true);
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
    <div>
      {isWriter && <button onClick={onDeleteHander}> 🗑 삭제하기</button>}
      {isWriter && (
        <button onClick={() => navigate(`/community/edit/${postId}`)}>
          ✏️ 수정하기
        </button>
      )}
      <button onClick={() => navigate('/community')}> ↩️ 목록으로</button>
    </div>
  );
}

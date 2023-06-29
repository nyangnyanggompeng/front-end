import { useState, useEffect } from 'react';

type ButtonsProps = {
  writerId: number;
};

export function Buttons({ writerId }: ButtonsProps) {
  const [isWriter, setIsWriter] = useState(false);
  // TODO : store에 저장되어 있는 유저의 id 가져오기
  const userId = 1; // DUMMY DATA
  useEffect(() => {
    if (userId === writerId) setIsWriter(true);
    else setIsWriter(false);
  }, [userId, writerId]);

  return (
    <div>
      {isWriter && <button>삭제하기</button>}
      {isWriter && <button>수정하기</button>}
      <button>목록으로</button>
    </div>
  );
}

import { useState, useEffect, Dispatch, SetStateAction } from 'react';

const OFFSET = 4;

type PaginationProps = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPage: number;
};

function Pagination({
  currentPage,
  setCurrentPage,
  totalPage,
}: PaginationProps) {
  const [pageArray, setPageArray] = useState<number[]>([1]);
  useEffect(() => {
    const startPage = Math.ceil(currentPage / (OFFSET + 1) - 1) * 5 + 1;
    const endPage =
      startPage + OFFSET > totalPage ? totalPage : startPage + OFFSET;
    if (startPage !== pageArray.at(0) || endPage !== pageArray.at(-1)) {
      setPageArray(
        Array.from(new Array(endPage - startPage + 1), (x, i) => i + startPage)
      );
    }
  }, [currentPage, totalPage]);

  return (
    <div>
      <button onClick={() => setCurrentPage(1)}>first</button>
      <button onClick={() => setCurrentPage(currentPage - 1)}>prev</button>
      {pageArray.map((page: number) => (
        <button key={page} onClick={() => setCurrentPage(page)}>
          {page}
        </button>
      ))}
      <button onClick={() => setCurrentPage(currentPage + 1)}>next</button>
      <button onClick={() => setCurrentPage(totalPage)}>last</button>
    </div>
  );
}

export default Pagination;

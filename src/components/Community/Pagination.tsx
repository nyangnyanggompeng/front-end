import { Dispatch, SetStateAction } from 'react';

type PaginationProps = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

function Pagination({ currentPage, setCurrentPage }: PaginationProps) {
  return (
    <div>
      <button onClick={() => setCurrentPage(currentPage - 1)}>prev</button>
      <button onClick={() => setCurrentPage(currentPage + 1)}>next</button>
    </div>
  );
}

export default Pagination;

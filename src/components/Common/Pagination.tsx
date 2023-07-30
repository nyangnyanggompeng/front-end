import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useTheme } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  PaginationContainer,
  CurrentPageButton,
} from '../../styles/Common/Pagination.styles';

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
  const theme = useTheme();
  const [pageArray, setPageArray] = useState<number[]>([1]);
  useEffect(() => {
    const startPage = Math.ceil(currentPage / (OFFSET + 1) - 1) * 5 + 1;
    const endPage =
      startPage + OFFSET > totalPage ? totalPage : startPage + OFFSET;
    if (startPage !== pageArray.at(0) || endPage !== pageArray.at(-1)) {
      setPageArray(
        Array.from(new Array(endPage - startPage + 1), (_x, i) => i + startPage)
      );
    }
  }, [currentPage, totalPage]);

  if (totalPage === 0) return null;

  return (
    <div css={PaginationContainer}>
      <button onClick={() => setCurrentPage(1)}>
        <FontAwesomeIcon icon={faAnglesLeft} />
      </button>
      <button onClick={() => setCurrentPage(currentPage - 1)}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {pageArray.map((page: number) => (
        <button
          key={page}
          css={currentPage === page && CurrentPageButton(theme)}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button onClick={() => setCurrentPage(currentPage + 1)}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      <button onClick={() => setCurrentPage(totalPage)}>
        <FontAwesomeIcon icon={faAnglesRight} />
      </button>
    </div>
  );
}

export default Pagination;

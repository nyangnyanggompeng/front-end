import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../components/Common/Button';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import InterviewItem from '../components/Interview/InterviewItem';
import MessageItem from '../components/Interview/MessageItem';
import { useEffect, useState } from 'react';
import Pagination from '../components/Common/Pagination';
import { getSearchList } from '../utils/Interview/interviewListFn';

const InterviewSearch = () => {
  const location = useLocation();
  // const { Result, numberOfResult, totalPages } = location.state;
  const [searchValues, setSearchValues] = useState({
    type: 'lists',
    keyword: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const onSearch = async () => {
    const data = getSearchList(searchValues, currentPage);
  };

  console.log(location);
  return (
    <main>
      <div className='inner'>
        <h2>검색결과</h2>
        <div className='subtit'>
          <div className='left'>
            <h3>전체 0개</h3>
          </div>
          <div className='search-box'>
            <select
              value={searchValues.type}
              onChange={(e) =>
                setSearchValues({ ...searchValues, type: e.target.value })
              }
            >
              <option value='lists'>인터뷰</option>
              <option value='contents'>메시지</option>
            </select>
            <input
              type='text'
              placeholder='검색할 키워드를 입력해주세요'
              value={searchValues.keyword}
              onChange={(e) =>
                setSearchValues({ ...searchValues, keyword: e.target.value })
              }
            />
            <Button onClick={onSearch}>
              <FontAwesomeIcon icon={faSearch} />
              검색
            </Button>
          </div>
        </div>
        <ul className='search-list'>
          {/* <InterviewItem /> */}
          {/* <MessageItem /> */}
        </ul>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={0}
        />
      </div>
    </main>
  );
};

export default InterviewSearch;

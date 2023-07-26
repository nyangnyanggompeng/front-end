import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../components/Common/Button';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import InterviewItem from '../components/Interview/InterviewItem';
import MessageItem from '../components/Interview/MessageItem';
import { useEffect, useState } from 'react';
import Pagination from '../components/Common/Pagination';
import { getSearchList } from '../utils/Interview/interviewListFn';
import { Theme, useTheme, css } from '@emotion/react';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';

const StyledInterviewSearch = (theme: Theme) =>
  css({
    '.subtit': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: `1px solid ${theme.gray2}`,
      paddingBottom: '3rem',
      marginBottom: '3rem',
      gap: '25rem',
    },
    h3: {
      marginBottom: '0.5rem',
    },
    '.search-box': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      width: '50%',

      input: {
        width: '64%',
      },
    },

    '.search-list': {
      marginBottom: '5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '3rem',
      '.message': {
        fontSize: '3rem',
        fontWeight: 700,
        textAlign: 'center',
        margin: '10rem 0',

        svg: {
          display: 'block',
          margin: '0 auto 3rem',
          fontSize: '8rem',
        },
      },
    },
  });

interface SearchDataTypes {
  Result: any[]; // TODO: 해결중...
  numberOfResult: number;
  totalPages: number;
}

const InterviewSearch = () => {
  const theme = useTheme();
  const location = useLocation();
  const [searchType, setSearchType] = useState(location.state[0]);
  const { Result, numberOfResult, totalPages } = location.state[1];
  const [searchValues, setSearchValues] = useState({
    type: 'lists',
    keyword: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchList, setSearchList] = useState<SearchDataTypes>({
    Result: Result || [],
    numberOfResult: numberOfResult || 0,
    totalPages: totalPages || 0,
  });

  const onSearch = async () => {
    const data = await getSearchList(searchValues, currentPage);
    setSearchType(searchValues.type);
    setSearchList({ ...searchList, ...data });
  };

  return (
    <main css={StyledInterviewSearch(theme)}>
      <div className='inner'>
        <h2>검색결과</h2>
        <div className='subtit'>
          <div className='left'>
            <h3>전체 {searchList.numberOfResult}개</h3>
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
          {!searchList || searchList.Result.length === 0 ? (
            <li className='message'>
              <FontAwesomeIcon icon={faFolderOpen} />
              검색결과가 없습니다.
            </li>
          ) : (
            searchList.Result.map((item) => {
              return searchType === 'lists' ? (
                <InterviewItem
                  key={item.id}
                  id={item.id}
                  type={item.type}
                  name={item.name}
                  createdAt={item.createdAt}
                />
              ) : (
                <MessageItem
                  key={item.id}
                  message={item}
                  listName={item.ChatGPTList.name}
                  listId={item.listId}
                />
              );
            })
          )}
        </ul>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={searchList.totalPages || 0}
        />
      </div>
    </main>
  );
};

export default InterviewSearch;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Common/Button';
import { faComments, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import InterviewItem from '../components/Interview/InterviewItem';
import axios from 'axios';
import { useState } from 'react';
import { ModalContainer } from '../components/Modal/ModalContainer';
import Pagination from '../components/Common/Pagination';
import { Theme, css, useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { InterviewData, errMsg } from '../types/Interview/ListTypes';
import { getList, getSearchList } from '../utils/Interview/interviewListFn';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Loading } from '../components/Common';

const StyledInterviewRoom = (theme: Theme) =>
  css({
    '.subtit': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: `1px solid ${theme.gray2}`,
      paddingBottom: '3rem',
      marginBottom: '3rem',
      gap: '10rem',
    },
    h3: {
      marginBottom: '0.5rem',
    },
    h4: {
      fontSize: '1.4rem',
      color: `${theme.gray1}`,
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

    '.btns': {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '3rem',
    },

    '.interview-list': {
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

const StyledModal = (theme: Theme) =>
  css({
    h4: {
      marginBottom: '3rem',
    },
    '.input-box': {
      marginBottom: '3rem',
      label: {
        fontSize: '1.8rem',
        fontWeight: 500,
        marginBottom: '0.5rem',
        display: 'block',
      },
    },
    '.btn-box': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
    },
  });

const InterviewRoom = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [chatName, setChatName] = useState('');
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [checkedArr, setCheckedArr] = useState<Set<number>>(new Set());
  const [searchValues, setSearchValues] = useState({
    type: 'lists',
    keyword: '',
  });
  const { isLoading, data } = useQuery<InterviewData | null>({
    queryKey: ['InterviewList', currentPage],
    queryFn: () => getList(currentPage),
  });

  const queryClient = useQueryClient();

  const onChangeCheck = (e: React.MouseEvent<HTMLInputElement>, id: number) => {
    const target = e.target as HTMLInputElement;
    setCheckedArr((prev) => {
      if (target.checked) {
        prev.add(id);
      } else {
        prev.delete(id);
      }
      return prev;
    });
  };

  const createNewChat = async () => {
    try {
      if (!chatName) {
        alert('인터뷰 이름을 입력해주세요.');
        return;
      }

      const res = await axios.post(`/chatgpt/lists`, { name: chatName });
      setChatName('');
      setIsOpen(false);
      navigate(`/interview-room/${res.data.id}`, {
        state: res.data,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.response !== undefined && err.response.data) {
          case 'LIST_NAME_NO_ENTERED':
            return alert(errMsg.LIST_NAME_NO_ENTERED);
          case 'LIST_NAME_ALREADY_EXISTS':
            return alert(errMsg.LIST_NAME_ALREADY_EXISTS);
          case 'UNABLE_TO_CREATE_LIST_ANYMORE': {
            setChatName('');
            setIsOpen(false);
            return alert(errMsg.LIST_NAME_NO_ENTERED);
          }
          default:
            return alert(errMsg.INTERNAL_SERVER_ERROR);
        }
      }
    }
  };

  const deleteAllChat = async () => {
    if (data?.List.length === 0) {
      alert('삭제할 수 있는 인터뷰가 없습니다.');
      return;
    }

    try {
      if (
        window.confirm(
          `모든 인터뷰가 삭제되고, 이 내용은 복구할 수 없습니다.\n정말 삭제하시겠습니까?`
        )
      ) {
        const filtered = data?.List.map((item) => item.id);
        await axios.put('/chatgpt/lists', { listIdList: filtered });
        alert('모든 인터뷰가 삭제되었습니다.');
        queryClient.invalidateQueries({ queryKey: ['InterviewList'] });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) alert(errMsg.INTERNAL_SERVER_ERROR);
    }
  };

  const deleteSelectedChat = async () => {
    if (data?.List.length === 0) {
      alert('삭제할 수 있는 인터뷰가 없습니다.');
      return;
    }
    setIsSelectMode(!isSelectMode);
    const listIdList = Array.from(checkedArr);
    if (isSelectMode && listIdList.length === 0) {
      alert('삭제할 인터뷰를 선택해주세요.');
      return;
    }

    if (isSelectMode) {
      try {
        if (
          window.confirm(
            `선택한 인터뷰가 삭제되고, 이 내용은 복구할 수 없습니다.\n정말 삭제하시겠습니까?`
          )
        ) {
          await axios.put('/chatgpt/lists', {
            listIdList,
          });
          queryClient.invalidateQueries({ queryKey: ['InterviewList'] });
        }
      } catch (err) {
        if (axios.isAxiosError(err)) alert(errMsg.INTERNAL_SERVER_ERROR);
      }
    }
  };

  const onSearch = async () => {
    try {
      const data = await getSearchList(searchValues, currentPage);
      navigate('/interview-room/search', { state: [searchValues.type, data] });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
          case 400:
            navigate('/interview-room/search', {
              state: [
                searchValues.type,
                {
                  Result: [],
                  numberOfResult: 0,
                  totalPages: 0,
                },
              ],
            });
            break;
          default:
            navigate(`/error/${err.response?.status}`);
        }
      }
    }
  };

  if (isLoading) return <Loading theme={theme} />;

  return (
    <>
      <main css={StyledInterviewRoom(theme)}>
        <div className='inner'>
          <h2>인터뷰 룸</h2>
          <div className='subtit'>
            <div className='left'>
              <h3>전체 {data?.numberOfList || 0}개</h3>
              <h4>채팅방은 최대 30개까지 생성할 수 있습니다.</h4>
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
          <div className='btns'>
            <Button status='sub' onClick={deleteAllChat}>
              <FontAwesomeIcon icon={faTrashCan} />
              전체삭제
            </Button>
            <Button status='sub' onClick={deleteSelectedChat}>
              <FontAwesomeIcon icon={faEraser} />
              {isSelectMode ? '삭제하기' : '선택삭제'}
            </Button>

            <Button onClick={() => setIsOpen(true)}>
              <FontAwesomeIcon icon={faPlus} />새 인터뷰
            </Button>
          </div>
          <ul className='interview-list'>
            {!data || data.List.length === 0 ? (
              <li className='message'>
                <FontAwesomeIcon icon={faComments} />
                인터뷰 룸이 존재하지 않습니다. <br />
                새로운 인터뷰 룸을 생성해 보세요!
              </li>
            ) : (
              data?.List.map((item) => {
                return (
                  <InterviewItem
                    key={item.id}
                    id={item.id}
                    type={item.type}
                    name={item.name}
                    createdAt={item.createdAt}
                    isSelectMode={isSelectMode}
                    onChangeCheck={onChangeCheck}
                  />
                );
              })
            )}
          </ul>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={data?.totalPages || 0}
          />
        </div>
      </main>
      {isOpen && (
        <ModalContainer resetModal={() => setIsOpen(!isOpen)}>
          <div css={StyledModal(theme)}>
            <h4>새 인터뷰 만들기</h4>
            <div className='input-box'>
              <label htmlFor='newInterviewName'>인터뷰 이름</label>
              <input
                type='text'
                id='newInterviewName'
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                placeholder='인터뷰 이름'
              />
            </div>
            <div className='btn-box'>
              <Button
                status='sub'
                onClick={() => {
                  setIsOpen(false), setChatName('');
                }}
              >
                취소
              </Button>
              <Button onClick={createNewChat}>완료</Button>
            </div>
          </div>
        </ModalContainer>
      )}
    </>
  );
};

export default InterviewRoom;

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
import { InterviewData, errMsg } from '../types/Interview/listTypes';
import { getList } from '../utils/Interview/interviewListFn';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const StyledInterviewRoom = (theme: Theme) =>
  css({
    '.subtit': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: `1px solid ${theme.gray2}`,
      paddingBottom: '3rem',
      marginBottom: '3rem',
    },
    h3: {
      marginBottom: '0.5rem',
    },
    h4: {
      fontSize: '1.4rem',
      color: `${theme.gray1}`,
    },
    '.search-box': {
      width: '30%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '1rem',

      input: {
        width: '70%',
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

const InterviewRoom = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [chatName, setChatName] = useState('');
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [checkedArr, setCheckedArr] = useState<Set<number>>(new Set());
  const { data } = useQuery<InterviewData | null>({
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

  const changeName = async (id: number, name: string) => {
    try {
      if (!name) {
        alert('수정할 내용을 입력해주세요.');
        return;
      }
      await axios.patch(`/chatgpt/lists/${id}`, { name });
      queryClient.invalidateQueries({ queryKey: ['InterviewList'] });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.status) {
          case 400:
            return alert('수정할 내용을 입력해주세요.');
          case 500:
            return alert(errMsg.INTERNAL_SERVER_ERROR);
        }
      }
    }
  };

  const createNewChat = async () => {
    try {
      if (!chatName) {
        alert('인터뷰 이름을 입력해주세요.');
        return;
      }

      const res = await axios.post(`/chatgpt/lists/8`, { name: chatName });
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

  const deleteChat = async (id: number) => {
    try {
      if (
        window.confirm(
          `인터뷰가 삭제되고 이 내용은 복구할 수 없습니다.\n정말 삭제하시겠습니까?`
        )
      ) {
        axios.put('/chatgpt/lists/', { listIdList: [id] });
        alert('인터뷰가 삭제되었습니다.');
        queryClient.invalidateQueries({ queryKey: ['InterviewList'] });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) alert(errMsg.INTERNAL_SERVER_ERROR);
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
        await axios.put('/chatgpt/lists/', { listIdList: filtered });
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

    if (isSelectMode) {
      try {
        if (
          window.confirm(
            `선택한 인터뷰가 삭제되고, 이 내용은 복구할 수 없습니다.\n정말 삭제하시겠습니까?`
          )
        ) {
          await axios.put('/chatgpt/lists', {
            listIdList: Array.from(checkedArr),
          });
          queryClient.invalidateQueries({ queryKey: ['InterviewList'] });
        }
      } catch (err) {
        if (axios.isAxiosError(err)) alert(errMsg.INTERNAL_SERVER_ERROR);
      }
    }
  };

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
              <input type='text' placeholder='인터뷰 이름을 입력해주세요' />
              <Button onClick={() => console.log('검색')}>
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
              <div className='message'>
                <FontAwesomeIcon icon={faComments} />
                인터뷰 룸이 존재하지 않습니다. <br />
                새로운 인터뷰 룸을 생성해 보세요!
              </div>
            ) : (
              data?.List.map((item) => {
                return (
                  <InterviewItem
                    key={item.id}
                    id={item.id}
                    type={item.type}
                    name={item.name}
                    createdAt={item.createdAt}
                    deleteChat={deleteChat}
                    isSelectMode={isSelectMode}
                    onChangeCheck={onChangeCheck}
                    changeName={changeName}
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
          <p>새 인터뷰 만들기</p>
          <div className='input-box'>
            <label htmlFor='newInterviewName'>인터뷰 이름</label>
            <input
              type='text'
              id='newInterviewName'
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
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
        </ModalContainer>
      )}
    </>
  );
};

export default InterviewRoom;

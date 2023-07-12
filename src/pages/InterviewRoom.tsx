import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Common/Button';
import { faComments, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import InterviewItem from '../components/Interview/InterviewItem';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ModalContainer } from '../components/Modal/ModalContainer';
import Pagination from '../components/Common/Pagination';
import { Theme, css, useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

interface InterviewListData {
  id: number;
  name: string;
  type: string;
  createdAt: string;
}

interface InterviewData {
  List: InterviewListData[];
  numberOfList: number;
  totalPages: number;
}

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
  const [interviewData, setInterviewData] = useState<InterviewData | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [chatName, setChatName] = useState('');
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [checkedArr, setCheckedArr] = useState<number[] | []>([]);

  const onChangeCheck = (id: number) => {
    setCheckedArr([...checkedArr, id]);
  };

  const changeName = async (newName: string) => {
    try {
      console.log(newName);
    } catch (err) {
      console.log(err);
    }
  };

  const getList = async () => {
    try {
      const res = await axios.get(`/chatgpt/lists/8/${currentPage}`);
      setInterviewData(res.data);
    } catch (err) {
      alert('서버 에러입니다. 잠시 후 다시 접속해 주세요.');
      setInterviewData(null);
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
      // navigate(`/interview-room/${res.data.id}`, {
      //   state: res.data,
      // });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data === 'LIST_NAME_ALREADY_EXISTS') {
          alert('이미 있는 이름입니다. 다시 입력해 주세요.');
        }
        if (err.response?.data === 'UNABLE_TO_CREATE_LIST_ANYMORE') {
          alert('인터뷰를 더 만들 수 없습니다.');
          setChatName('');
          setIsOpen(false);
        }
      }
    }
  };

  const deleteChat = async (id: number) => {
    try {
      if (
        confirm(
          '모든 인터뷰가 삭제되고 이 내용은 복구할 수 없습니다. 정말 삭제하시겠습니까?'
        )
      ) {
        axios.put('/chatgpt/lists/', { listIdList: [id] });
        alert('인터뷰가 삭제되었습니다.');
        getList();
      }
    } catch (err) {
      if (axios.isAxiosError(err))
        alert('서버 에러입니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  const deleteAllChat = async () => {
    if (interviewData?.List.length === 0) {
      alert('삭제할 수 있는 인터뷰가 없습니다.');
      return;
    }

    try {
      if (
        window.confirm(
          '모든 인터뷰가 삭제되고, 이 내용은 복구할 수 없습니다. 정말 삭제하시겠습니까?'
        )
      ) {
        const filtered = interviewData?.List.map((item) => item.id);
        await axios.put('/chatgpt/lists/', { listIdList: filtered });
        alert('모든 인터뷰가 삭제되었습니다.');
        getList();
      }
    } catch (err) {
      if (axios.isAxiosError(err))
        alert('서버 에러입니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  const deleteSelectedChat = async () => {
    if (interviewData?.List.length === 0) {
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
          await axios.put('/chatgpt/lists', { listIdList: checkedArr });
          getList();
        }
      } catch (err) {
        if (axios.isAxiosError(err))
          alert('서버 에러입니다. 잠시 후 다시 시도해 주세요.');
      }
    }
  };

  useEffect(() => {
    getList();
  }, [currentPage]);

  return (
    <>
      <main css={StyledInterviewRoom(theme)}>
        <div className='inner'>
          <h2>인터뷰 룸</h2>
          <div className='subtit'>
            <div className='left'>
              <h3>전체 {interviewData?.numberOfList || 0}개</h3>
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
            {!interviewData || interviewData.List.length === 0 ? (
              <div className='message'>
                <FontAwesomeIcon icon={faComments} />
                인터뷰 룸이 존재하지 않습니다. <br />
                새로운 인터뷰 룸을 생성해 보세요!
              </div>
            ) : (
              interviewData?.List.map((item) => {
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
            totalPage={interviewData?.totalPages || 0}
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

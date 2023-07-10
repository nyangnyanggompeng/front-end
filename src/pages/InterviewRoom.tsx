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
  const [interviewData, setInterviewData] = useState<InterviewData | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [chatName, setChatName] = useState('');

  const getList = async () => {
    try {
      const res = await axios.get(`/chatgpt/list/8/${currentPage}`);
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
      const res = await axios.post(`/chatgpt/list/8`, { name: chatName });
      // TODO : id, type, name, createdAt 받아서 navigate로 상세페이지에 넘겨주기
      console.log(res.data);
      setChatName('');
      setIsOpen(false);
      getList();
    } catch (err) {
      // TODO : 에러처리 타입별로 나눠서 다시 해주기
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
      axios.put(`/chatgpt/list/${id}`);
      alert('인터뷰가 삭제되었습니다.');
      getList();
    } catch (err) {
      if (axios.isAxiosError(err))
        alert('서버 에러입니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    getList();
  }, []);

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
            <Button status='sub' onClick={() => console.log('전체삭제')}>
              <FontAwesomeIcon icon={faTrashCan} />
              전체삭제
            </Button>
            <Button status='sub' onClick={() => console.log('선택삭제')}>
              <FontAwesomeIcon icon={faEraser} />
              선택삭제
            </Button>
            <Button onClick={() => setIsOpen(true)}>
              <FontAwesomeIcon icon={faPlus} />새 인터뷰
            </Button>
          </div>
          <ul className='interview-list'>
            {interviewData?.List.length === 0 ? (
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
                    title={item.name}
                    createdAt={item.createdAt}
                    deleteChat={deleteChat}
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
            <Button status='sub' onClick={() => setIsOpen(false)}>
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

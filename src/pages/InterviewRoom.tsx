import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Layout/Button';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import InterviewItem from '../components/Interview/InterviewItem';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ModalContainer } from '../components/Modal/ModalContainer';

interface InterviewListData {
  id: number;
  name: string;
  type: string;
  createdAt: string;
}

interface InterviewData {
  List: InterviewListData;
  numberOfList: number;
  totalPages: number;
}

const InterviewRoom = () => {
  const dummy = {
    List: [
      {
        id: 2,
        name: '대화목록2',
        type: '',
        createdAt: '2023-07-07T15:50:44.000Z',
      },
      {
        id: 1,
        name: '대화목록1',
        type: '',
        createdAt: '2023-07-07T15:50:35.000Z',
      },
    ],
    numberOfList: 2,
    totalPages: 1,
  };

  const [interviewList, setInterviewList] = useState<InterviewListData[] | []>(
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const getList = async () => {
    try {
      // const res = await axios.get('/chatgpt/list/1');
      // setInterviewList(res.data);
      setInterviewList(dummy.List);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <main>
        <div className='inner'>
          <h2>인터뷰 룸</h2>
          <div className='subtit'>
            <div className='left'>
              <h3>전체 {dummy.numberOfList}개</h3>
              <h4>채팅방은 최대 30개까지 생성할 수 있습니다.</h4>
            </div>
            <div>검색</div>
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
            {interviewList.length === 0 ? (
              <div>
                인터뷰 룸이 존재하지 않습니다. <br />
                새로운 인터뷰 룸을 생성해 보세요!
              </div>
            ) : (
              interviewList.map((item) => {
                return (
                  <InterviewItem
                    key={item.id}
                    id={item.id}
                    type={item.type}
                    title={item.name}
                    createdAt={item.createdAt}
                  />
                );
              })
            )}
          </ul>
          {/* TODO : 페이지네이션 추가 */}
          <div>pagenation</div>
        </div>
      </main>
      {isOpen && (
        <ModalContainer resetModal={() => setIsOpen(!isOpen)}>
          <h2>새 인터뷰 만들기</h2>
          <div className='input-box'>
            <label htmlFor='newInterviewName'>인터뷰 이름</label>
            <input type='text' id='newInterviewName' />
          </div>
          <div className='btn-box'>
            <Button status='sub' onClick={() => setIsOpen(false)}>
              취소
            </Button>
            <Button onClick={() => console.log('인터뷰 생성')}>완료</Button>
          </div>
        </ModalContainer>
      )}
    </>
  );
};

export default InterviewRoom;

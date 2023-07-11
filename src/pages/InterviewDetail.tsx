import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../components/Common/Button';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ReplyItem from '../components/Interview/ReplyItem';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { parseDate } from '../utils/Interview/InterviewFn';

export interface InterviewDetailData {
  id: number;
  questionNum: number;
  sender: 'user' | 'assistant';
  content: string;
  bookmark: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  listId: number;
}

const InterviewDetail = () => {
  const location = useLocation();
  const { id, type, name, createdAt } = location.state;
  const [detailData, setDetailData] = useState<InterviewDetailData[]>([]);

  console.log(id, type, name, createdAt);

  const getChatData = async () => {
    try {
      const res = await axios.get(`/chatgpt/contents/${id}`);
      setDetailData(res.data);
    } catch (err) {
      console.log(err);
      setDetailData([]);
    }
  };

  useEffect(() => {
    getChatData();
  }, []);

  return (
    <main>
      <div className='inner'>
        <h2>인터뷰 룸</h2>
        <div className='title'>
          <span className='type'>{type}</span>
          <h3>{name}</h3>
          <span className='date'>{parseDate(createdAt)}</span>
        </div>
        <form>
          <div>
            <p>면접 유형</p>
            <label>
              <input type='radio' defaultChecked name='type' value='normal' />
              일반 면접
            </label>
            <label>
              <input type='radio' name='type' value='tech' /> 기술 면접
            </label>
            <label>
              <input type='radio' name='type' value='personal' /> 인성 면접
            </label>
          </div>
          <div>
            <label htmlFor='questionNum'>예상 질문 개수</label>
            <select id='questionNum'>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div>
            <div>
              <label htmlFor='text'>자기소개서</label>
              <p>0 / 3000</p>
            </div>
            <textarea id='text' />
          </div>
          <Button onClick={() => console.log('질문폼 전송')}>질문하기</Button>
        </form>
        <div className='reply-wrap'>
          <Button onClick={() => console.log('전체 접기/펴기')}>
            전체 펴기
            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
          <ul className='reply-list'>
            <div>
              자기소개서를 입력하고 <br />
              면접 예상 질문을 받아보세요!
            </div>
            {/* 전체 배열의 개수만큼 출력하는게 아니라 퀘스천 넘버의 가장 큰 숫자만큼? 반복 */}
            {detailData.map((question) => {
              return <ReplyItem key={question.id} question={question} />;
            })}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default InterviewDetail;

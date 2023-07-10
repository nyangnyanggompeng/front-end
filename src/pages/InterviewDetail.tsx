import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../components/Common/Button';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ReplyItem from '../components/Interview/ReplyItem';

const InterviewDetail = () => {
  return (
    <main>
      <div className='inner'>
        <h2>인터뷰 룸</h2>
        <div className='title'>
          <span className='type'>인성면접</span>
          <h3>채팅방 제목 랄랄라</h3>
        </div>
        <form>
          <div>
            <p>면접 유형</p>
            <label>
              <input type='radio' checked name='type' value='normal' />
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
            <ReplyItem />
          </ul>
        </div>
      </div>
    </main>
  );
};

export default InterviewDetail;

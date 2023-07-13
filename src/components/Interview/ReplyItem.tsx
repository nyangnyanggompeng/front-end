import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Common/Button';
import MessageItem from './MessageItem';
import { InterviewDetailData } from '../../types/Interview/detailTypes';

interface ReplyItemProps {
  questionNum: number;
  messages: InterviewDetailData[];
}

const ReplyItem = ({ questionNum, messages }: ReplyItemProps) => {
  return (
    <li>
      <div className='title'>
        <p>질문 {questionNum}</p>
        <button type='button'>
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
      <div className='message-wrap'>
        {/* 같은 질문번호를 가진 메시지 배열 필요함  */}
        <MessageItem />
      </div>
      <div className='text'>
        <textarea />
        <Button onClick={() => console.log('개별답변 등록')}>등록</Button>
      </div>
    </li>
  );
};

export default ReplyItem;

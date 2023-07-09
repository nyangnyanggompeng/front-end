import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Layout/Button';
import MessageItem from './MessageItem';

const ReplyItem = () => {
  return (
    <li>
      <div className='title'>
        <p>질문 1</p>
        <button type='button'>
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
      <div className='message-wrap'>
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

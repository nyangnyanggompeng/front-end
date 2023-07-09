import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MessageItem = () => {
  return (
    <div>
      <p>메시지 텍스트 </p>
      <button type='button'>
        <FontAwesomeIcon icon={faBookmark} />
      </button>
    </div>
  );
};

export default MessageItem;

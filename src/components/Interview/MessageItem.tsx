import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark as bookmarkOff,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import {
  faBookmark as bookmarkOn,
  faDesktop,
} from '@fortawesome/free-solid-svg-icons';
import { InterviewDetailData } from '../../types/Interview/detailTypes';
import { parseDate } from '../../utils/Interview/interviewListFn';
import { Theme, css, useTheme } from '@emotion/react';

interface MessageProps {
  message: InterviewDetailData;
}

const StyledMessageItem = (theme: Theme) =>
  css({
    border: `1px solid ${theme.gray2}`,
    borderRadius: 5,
    padding: '2rem',
  });

const MessageItem = ({ message }: MessageProps) => {
  const theme = useTheme();
  return (
    <div css={StyledMessageItem(theme)}>
      <div className='icon'>
        {message.sender === 'assistant' ? (
          <FontAwesomeIcon icon={faDesktop} />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </div>
      <div className='content-wrap'>
        <div>
          <p className='content'>{message.content}</p>
          {/* bookmark on event */}
          <button type='button'>
            {message.bookmark ? (
              <FontAwesomeIcon icon={bookmarkOn} />
            ) : (
              <FontAwesomeIcon icon={bookmarkOff} />
            )}
          </button>
        </div>
        <span className='date'>{parseDate(message.updatedAt)}</span>
      </div>
    </div>
  );
};

export default MessageItem;

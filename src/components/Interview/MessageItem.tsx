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
  bookmarkToggle(contentId: number, isBookmarked: boolean): void;
}

const StyledMessageItem = (theme: Theme) =>
  css({
    width: 'fit-content',
    minWidth: '60%',
    border: `1px solid ${theme.gray2}`,
    borderRadius: 5,
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '3rem',
    '.icon': {
      backgroundColor: `${theme.blue1}`,
      padding: '2rem',
      borderRadius: '50%',
      width: '8rem',
      height: '8rem',
      fontSize: '3.2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '.content-wrap': {
      width: 'calc(100% - 8rem - 3rem)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'flex-start',
      justifyContent: 'space-between',
      gap: '2rem',
      '>div': {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        button: {
          flexBasis: '2rem',
        },
        p: {
          width: 'calc(100% - 5rem)',
        },
      },
      '.date': {
        color: `${theme.gray1}`,
        fontSize: '1.4rem',
      },
    },
    '&.user': {
      flexDirection: 'row-reverse',
      alignSelf: 'flex-end',
    },
  });

const MessageItem = ({ message, bookmarkToggle }: MessageProps) => {
  const theme = useTheme();

  return (
    <div css={StyledMessageItem(theme)} className={message.sender}>
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
          {message.sender === 'assistant' && (
            <button
              type='button'
              onClick={() => bookmarkToggle(message.id, !message.bookmark)}
            >
              {message.bookmark ? (
                <FontAwesomeIcon icon={bookmarkOn} />
              ) : (
                <FontAwesomeIcon icon={bookmarkOff} />
              )}
            </button>
          )}
        </div>
        <span className='date'>{parseDate(message.updatedAt)}</span>
      </div>
    </div>
  );
};

export default MessageItem;

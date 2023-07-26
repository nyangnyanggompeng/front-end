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
import { bookmarkToggle } from '../../utils/Interview/interviewDetailFn';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

interface MessageProps {
  message: InterviewDetailData;
  listName?: string;
  listId?: number;
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
      position: 'relative',
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
      '.icon': {
        backgroundColor: `${theme.orange2}`,
      },
    },
    '.list-name': {
      fontSize: '1.4rem',
      fontWeight: 500,
      alignSelf: 'flex-start',
      borderBottom: `1px solid transparent`,
      '&:hover': {
        borderBottomColor: `${theme.fontColor}`,
      },
    },
  });

const MessageItem = ({ message, listName, listId }: MessageProps) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const onBookmarkChange = () => {
    bookmarkToggle(message.id, !message.bookmark).then(() =>
      queryClient.invalidateQueries({ queryKey: ['InterviewDetailData'] })
    );
  };
  return (
    <li css={StyledMessageItem(theme)} className={message.sender}>
      <div className='icon'>
        {message.sender === 'assistant' ? (
          <FontAwesomeIcon icon={faDesktop} />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </div>
      <div className='content-wrap'>
        {listId && (
          <Link className='list-name' to={`/interview-room/${listId}`}>
            {listName}
          </Link>
        )}
        <div>
          <p className='content'>{message.content}</p>
          {message.sender === 'assistant' && (
            <button type='button' onClick={onBookmarkChange}>
              {message.bookmark ? (
                <FontAwesomeIcon icon={bookmarkOn} />
              ) : (
                <FontAwesomeIcon icon={bookmarkOff} />
              )}
            </button>
          )}
        </div>
        <span className='date'>{parseDate(message.createdAt)}</span>
      </div>
    </li>
  );
};

export default MessageItem;

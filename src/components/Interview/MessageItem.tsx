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
import { useNavigate } from 'react-router-dom';
import { mq } from '../../theme';

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
      '.content-wrap': {
        '>div': {
          p: {
            width: '100%',
          },
        },
      },
    },
    '.list-name': {
      fontSize: '1.4rem',
      fontWeight: 500,
      alignSelf: 'flex-start',
      borderBottom: `1px solid transparent`,
      cursor: 'pointer',
      '&:hover': {
        borderBottomColor: `${theme.fontColor}`,
      },
    },

    [mq[1]]: {
      padding: '1rem',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '1rem',
      '.icon': {
        padding: 0,
        width: '3rem',
        height: '3rem',
        fontSize: '1.4rem',
      },
      '.content-wrap': {
        width: '100%',
        gap: '1rem',
        '>div': {
          p: {
            width: 'calc(100% - 2.5rem)',
          },
        },
      },
      '&.user': {
        flexDirection: 'column',
        alignSelf: 'flex-end',
        '> .icon': {
          alignSelf: 'flex-end',
        },
      },
    },
  });

const MessageItem = ({ message, listName, listId }: MessageProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
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
          <p
            className='list-name'
            onClick={() =>
              navigate(`/interview-room/${listId}`, {
                state: {
                  id: listId,
                  name: listName,
                  createdAt: message.createdAt,
                },
              })
            }
          >
            {listName}
          </p>
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

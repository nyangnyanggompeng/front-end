import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Common/Button';
import MessageItem from './MessageItem';
import { InterviewDetailData } from '../../types/Interview/detailTypes';
import { Theme, css, useTheme } from '@emotion/react';
import { useState } from 'react';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

interface ReplyItemProps {
  questionNum: number;
  messages: InterviewDetailData[];
  sendAnswer(
    listId: number,
    questionNum: number,
    answer: string
  ): Promise<void>;
  deleteQuestion(listId: number, contentIdList: number[]): Promise<void>;
  bookmarkToggle(contentId: number, isBookmarked: boolean): void;
}

const StyledReplyItem = (theme: Theme) =>
  css({
    border: `1px solid ${theme.gray2}`,
    borderRadius: 5,
    width: '100%',
    '> div': {
      padding: '2rem',
    },
    '.message-title': {
      borderBottom: `1px solid ${theme.gray2}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: 700,
      '>div': {
        display: 'flex',
        gap: '2rem',
      },
    },
    '.message-wrap': {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    },
    '.text': {
      borderTop: `1px solid ${theme.gray2}`,
      display: 'flex',
      gap: '1rem',
      textarea: {
        flex: '0 1 95%',
        '&.disabled': {
          backgroundColor: `${theme.gray2}`,
        },
      },
    },
  });

const ReplyItem = ({
  questionNum,
  messages,
  sendAnswer,
  deleteQuestion,
  bookmarkToggle,
}: ReplyItemProps) => {
  const theme = useTheme();
  const [value, setValue] = useState('');

  return (
    <li css={StyledReplyItem(theme)}>
      <div className='message-title'>
        <p>질문 {questionNum}</p>
        <div>
          <button
            type='button'
            onClick={() =>
              deleteQuestion(
                messages[0].listId,
                messages.map((el) => el.id)
              )
            }
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          <button type='button'>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
      </div>
      <div className='message-wrap'>
        {messages.map((item) => {
          return (
            <MessageItem
              key={item.id}
              message={item}
              bookmarkToggle={bookmarkToggle}
            />
          );
        })}
      </div>
      <div className='text'>
        <textarea
          value={value}
          className={messages.length > 1 ? 'disabled' : ''}
          onChange={(e) => setValue(e.target.value)}
          disabled={messages.length > 1}
        />
        <Button
          status={messages.length > 1 ? 'disable' : 'main'}
          onClick={() =>
            sendAnswer(messages[0].listId, messages[0].questionNum, value)
          }
        >
          등록
        </Button>
      </div>
    </li>
  );
};

export default ReplyItem;

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Common/Button';
import MessageItem from './MessageItem';
import { InterviewDetailData } from '../../types/Interview/detailTypes';
import { Theme, css, useTheme } from '@emotion/react';

interface ReplyItemProps {
  questionNum: number;
  messages: InterviewDetailData[];
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
      },
    },
  });

const ReplyItem = ({ questionNum, messages }: ReplyItemProps) => {
  const theme = useTheme();
  return (
    <li css={StyledReplyItem(theme)}>
      <div className='message-title'>
        <p>질문 {questionNum}</p>
        <button type='button'>
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
      <div className='message-wrap'>
        {messages.map((item) => {
          return <MessageItem key={item.id} message={item} />;
        })}
      </div>
      <div className='text'>
        <textarea />
        <Button onClick={() => console.log('개별답변 등록')}>등록</Button>
      </div>
    </li>
  );
};

export default ReplyItem;

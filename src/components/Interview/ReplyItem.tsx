import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Common/Button';
import MessageItem from './MessageItem';
import { InterviewDetailData } from '../../types/Interview/detailTypes';
import { Theme, css, useTheme } from '@emotion/react';
import { useRef, useState } from 'react';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../Common';

interface ReplyItemProps {
  questionNum: number;
  messages: InterviewDetailData[];
  deleteQuestion(listId: number, contentIdList: number[]): Promise<void>;
  isCloseList: { [key: number]: boolean };
  setIsCloseList: React.Dispatch<
    React.SetStateAction<{
      [key: number]: boolean;
    }>
  >;
}

const StyledReplyItem = (theme: Theme) =>
  css({
    border: `1px solid ${theme.gray2}`,
    borderRadius: 5,
    width: '100%',
    overflow: 'hidden',
    transition: '.5s',
    '> div, > ul': {
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
      overflow: 'hidden',
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
    '&.close': {
      height: '6.5rem',
      '.message-title': {
        borderBottomColor: 'transparent',
      },
    },
    '&.open': {
      height: 'auto',
    },
  });

const ReplyItem = ({
  questionNum,
  messages,
  deleteQuestion,
  isCloseList,
  setIsCloseList,
}: ReplyItemProps) => {
  const theme = useTheme();
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(messages.length > 1);
  const [customLoading, setCustomLoading] = useState(false);
  const titleArea = useRef<HTMLDivElement>(null);
  const messageArea = useRef<HTMLUListElement>(null);
  const txtArea = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const sendAnswer = async (
    listId: number,
    questionNum: number,
    answer: string
  ) => {
    try {
      if (answer === '') {
        alert('답변을 입력해주세요.');
        return;
      }
      setCustomLoading(true);
      await axios.post(`/chatgpt/contents/${listId}/${questionNum}`, {
        answer,
      });
      queryClient.invalidateQueries({ queryKey: ['InterviewDetailData'] });
      setCustomLoading(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
          case 400:
            return alert('답변을 입력해 주세요.');
          default:
            return navigate(`/error/${err.response?.status}`);
        }
      }
    }
  };

  return (
    <li
      css={StyledReplyItem(theme)}
      className={isCloseList[messages[0]?.questionNum] ? 'close' : 'open'}
    >
      <div className='message-title' ref={titleArea}>
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
          <button
            type='button'
            onClick={() =>
              setIsCloseList({
                ...isCloseList,
                [messages[0]?.questionNum]:
                  !isCloseList[messages[0]?.questionNum],
              })
            }
          >
            {isCloseList[messages[0]?.questionNum] ? (
              <FontAwesomeIcon icon={faChevronDown} />
            ) : (
              <FontAwesomeIcon icon={faChevronUp} />
            )}
          </button>
        </div>
      </div>
      <ul className='message-wrap' ref={messageArea}>
        {customLoading ? (
          <Loading theme={theme} />
        ) : (
          messages.map((item) => {
            return <MessageItem key={item.id} message={item} />;
          })
        )}
      </ul>
      <div className='text' ref={txtArea}>
        <textarea
          value={value}
          className={isDisabled ? 'disabled' : ''}
          onChange={(e) => setValue(e.target.value)}
          disabled={isDisabled}
        />
        <Button
          status={isDisabled ? 'disable' : 'main'}
          onClick={() => {
            sendAnswer(messages[0].listId, messages[0].questionNum, value);
            setIsDisabled(true);
          }}
        >
          등록
        </Button>
      </div>
    </li>
  );
};

export default ReplyItem;

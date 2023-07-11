import { Theme, css, useTheme } from '@emotion/react';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { parseDate } from '../../utils/Interview/InterviewFn';

interface InterviewItemProps {
  id: number;
  type: string;
  name: string;
  createdAt: string;
  deleteChat(id: number): void;
}

const StyledInterviewItem = (theme: Theme) =>
  css({
    border: `1px solid ${theme.gray2}`,
    borderRadius: 5,
    padding: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '2rem',

    '.left': {
      flex: '0 0 5%',
    },
    '.mid': {
      flexGrow: 1,
      width: '80%',
      '.type': {
        display: 'inline-block',
        borderRadius: 5,
        padding: `0.5rem 1rem`,
        fontSize: '1.4rem',
        backgroundColor: `${theme.gray2}`,

        '&.일반': {
          backgroundColor: `${theme.yellow}`,
        },
        '&.기술': {
          backgroundColor: `${theme.blue2}`,
          color: `${theme.white}`,
        },
        '&.인성': {
          backgroundColor: `${theme.green}`,
          color: `${theme.white}`,
        },
      },
      '.title': {
        fontSize: '2.4rem',
        margin: '1rem 0',
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
      },
      '.date': {
        fontSize: '1.4rem',
        color: `${theme.gray1}`,
      },
    },
    '.right': {
      flex: '0 0 5%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

const InterviewItem = ({
  id,
  type,
  name,
  createdAt,
  deleteChat,
}: InterviewItemProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <li css={StyledInterviewItem(theme)}>
      <div className='left'>
        <input type='checkbox' />
      </div>
      <div className='mid'>
        <span className={!type ? 'type' : `type ${type}`}>
          {!type ? '작성 전' : `${type}면접`}
        </span>
        <p
          className='title'
          onClick={() =>
            navigate(`/interview-room/${id}`, {
              state: { id, type, name, createdAt },
            })
          }
        >
          {name}
        </p>
        <p className='date'>{parseDate(createdAt)}</p>
      </div>
      <div className='right'>
        <button type='button' className='btn-edit'>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button
          type='button'
          className='btn-delete'
          onClick={() => deleteChat(id)}
        >
          <FontAwesomeIcon icon={faEraser} />
        </button>
      </div>
    </li>
  );
};

export default InterviewItem;

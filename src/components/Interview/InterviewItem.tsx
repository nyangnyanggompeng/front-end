import { Theme, css, useTheme } from '@emotion/react';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { parseDate } from '../../utils/Interview/InterviewFn';
import { useState } from 'react';

interface InterviewItemProps {
  id: number;
  type: string;
  name: string;
  createdAt: string;
  deleteChat(id: number): void;
  isSelectMode: boolean;
  onChangeCheck(id: number): void;
  changeName(id: number, newName: string): void;
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
      '.checkbox': {
        padding: '1rem',
      },
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
        marginBottom: '1rem',

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
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
      },
      '.date': {
        marginTop: '1rem',
        fontSize: '1.4rem',
        color: `${theme.gray1}`,
      },
    },
    '.right': {
      flex: '0 0 5%',
      fontSize: '1.8rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',

      '.btn-edit': {
        '.fa-check': {
          color: `${theme.green}`,
        },
      },
    },
  });

const InterviewItem = ({
  id,
  type,
  name,
  createdAt,
  deleteChat,
  isSelectMode,
  onChangeCheck,
  changeName,
}: InterviewItemProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState(name);

  const onEdit = (id: number, name: string) => {
    changeName(id, name);
    setIsEdit(false);
  };

  return (
    <li css={StyledInterviewItem(theme)}>
      {isSelectMode && (
        <div className='left'>
          <label className='checkbox' onClick={() => onChangeCheck(id)}>
            <input type='checkbox' />
          </label>
        </div>
      )}
      <div className='mid'>
        <span className={!type ? 'type' : `type ${type}`}>
          {!type ? '작성 전' : `${type}면접`}
        </span>
        {isEdit ? (
          <input
            type='text'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        ) : (
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
        )}
        <p className='date'>{parseDate(createdAt)}</p>
      </div>
      <div className='right'>
        <button
          type='button'
          className='btn-edit'
          onClick={() => (isEdit ? onEdit(id, newName) : setIsEdit(true))}
        >
          {isEdit ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <FontAwesomeIcon icon={faPenToSquare} />
          )}
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

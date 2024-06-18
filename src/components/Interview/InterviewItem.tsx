import { Theme, css, useTheme } from '@emotion/react';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { deleteChat, parseDate } from '../../utils/Interview/interviewListFn';
import { useState } from 'react';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { errMsg } from '../../types/Interview/ListTypes';
import { mq } from '../../theme';

interface InterviewItemProps {
  id: number;
  type: string;
  name: string;
  createdAt: string;
  isSelectMode?: boolean;
  onChangeCheck?(e: React.MouseEvent<HTMLInputElement>, id: number): void;
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
      flex: '0 0 3rem',
    },
    '.mid': {
      flex: '1 1 0',
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
      flex: '0 0 5rem',
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

    [mq[0]]: {
      '.mid': {
        '.title': {
          fontSize: '2rem',
        },
      },
    },
    [mq[1]]: {
      '.mid': {
        '.title': {
          fontSize: '1.8rem',
        },
      },
    },
  });

const InterviewItem = ({
  id,
  type,
  name,
  createdAt,
  isSelectMode,
  onChangeCheck,
}: InterviewItemProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState(name);
  const queryClient = useQueryClient();

  const changeName = async (id: number, name: string) => {
    try {
      if (!name) {
        alert('수정할 내용을 입력해주세요.');
        return;
      }
      await axios.patch(`/chatgpt/lists/${id}`, { name });
      queryClient.invalidateQueries({ queryKey: ['InterviewList'] });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.status) {
          case 400:
            return alert('수정할 내용을 입력해주세요.');
          case 500:
            return alert(errMsg.INTERNAL_SERVER_ERROR);
        }
      }
    }
  };

  const onEdit = (id: number, name: string) => {
    changeName(id, name);
    setIsEdit(false);
  };

  return (
    <li css={StyledInterviewItem(theme)}>
      {isSelectMode && (
        <div className='left'>
          <label className='checkbox'>
            <input
              type='checkbox'
              onClick={(e) => onChangeCheck && onChangeCheck(e, id)}
            />
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
              navigate(`/interview-room/${id}`, { state: { name } })
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
          onClick={() => deleteChat([id])}
        >
          <FontAwesomeIcon icon={faEraser} />
        </button>
      </div>
    </li>
  );
};

export default InterviewItem;

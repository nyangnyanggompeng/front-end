import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

interface InterviewItemProps {
  id: number;
  type: string;
  title: string;
  createdAt: string;
}

const InterviewItem = ({ id, type, title, createdAt }: InterviewItemProps) => {
  const navigate = useNavigate();
  const parseDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };
  return (
    <li onClick={() => navigate(`/interview-room/${id}`)}>
      <div className='left'>
        <input type='checkbox' />
      </div>
      <div className='mid'>
        <span className='type'>{type === '' ? '작성 전' : type}</span>
        <p className='title'>{title}</p>
        <p className='created-at'>{parseDate(createdAt)}</p>
      </div>
      <div className='right'>
        <button type='button' className='btn-edit'>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button type='button' className='btn-delete'>
          <FontAwesomeIcon icon={faEraser} />
        </button>
      </div>
    </li>
  );
};

export default InterviewItem;

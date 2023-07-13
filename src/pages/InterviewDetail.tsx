import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../components/Common/Button';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ReplyItem from '../components/Interview/ReplyItem';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { InterviewDetailData } from '../types/Interview/detailTypes';
import { parseDate } from '../utils/Interview/interviewListFn';
import { Theme, css, useTheme } from '@emotion/react';

const StyledInterviewDetail = (theme: Theme) =>
  css({
    '.title': {
      marginBottom: '3rem',
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
      h3: {
        margin: '1rem 0',
      },
      '.date': {
        color: `${theme.gray1}`,
      },
    },
    form: {
      border: `1px solid ${theme.gray2}`,
      borderRadius: 5,
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '5rem',
      gap: '1rem',
      '> div': {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      },
      '.radio-box p, .count-box label, .prompt-box label': {
        fontSize: '1.8rem',
        fontWeight: 700,
        marginRight: '1rem',
      },
      '.radio-box': {
        input: {
          width: 'auto',
          marginRight: '0.5rem',
        },
      },
      '.prompt-box': {
        flexDirection: 'column',
        alignItems: 'flex-start',
        '.txt-info': {
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        textarea: {
          height: '10rem',
        },
      },
    },
    '.reply-wrap': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '> button': {
        alignSelf: 'flex-end',
      },
      '.no-content': {
        fontSize: '3rem',
        fontWeight: 700,
        textAlign: 'center',
        margin: '10rem 0',
      },
    },
  });

const InterviewDetail = () => {
  const theme = useTheme();
  const location = useLocation();
  const { id, type, name, createdAt } = location.state;
  const radio = ['일반', '기술', '인성'];
  const [formData, setFormData] = useState({
    type: '',
    count: '0',
    prompt: '',
  });

  const [detailData, setDetailData] = useState<InterviewDetailData[]>([]);
  // console.log(id, type, name, createdAt);

  const onChangeRadio = (value: string) => {
    setFormData({ ...formData, type: value });
  };

  const getChatData = async () => {
    try {
      const res = await axios.get(`/chatgpt/contents/${id}`);
      setDetailData(res.data);
    } catch (err) {
      console.log(err);
      setDetailData([]);
    }
  };

  useEffect(() => {
    getChatData();
  }, []);

  return (
    <main css={StyledInterviewDetail(theme)}>
      <div className='inner'>
        <h2>인터뷰 룸</h2>
        <div className='title'>
          <span className={!type ? 'type' : `type ${type}`}>
            {!type ? '작성 중' : `${type}면접`}
          </span>
          <h3>{name}</h3>
          <span className='date'>{parseDate(createdAt)}</span>
        </div>
        <form>
          <div className='radio-box'>
            <p>면접 유형</p>
            {radio.map((item, idx) => {
              return (
                <label key={idx}>
                  <input
                    type='radio'
                    name='type'
                    value={item}
                    checked={type === item || (!type && item === '일반')}
                    onChange={(e) => onChangeRadio(e.target.value)}
                  />
                  {item}면접
                </label>
              );
            })}
          </div>
          <div className='count-box'>
            <label htmlFor='count'>예상 질문 개수</label>
            <select id='count'>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div className='prompt-box'>
            <div className='txt-info'>
              <label htmlFor='text'>자기소개서</label>
              <p>0 / 3000</p>
            </div>
            <textarea id='text' placeholder='자기소개서를 입력해 주세요.' />
          </div>
          <Button onClick={() => console.log('질문폼 전송')}>질문하기</Button>
        </form>
        <div className='reply-wrap'>
          <Button status='sub' onClick={() => console.log('전체 접기/펴기')}>
            전체 펴기
            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
          <ul className='reply-list'>
            <div className='no-content'>
              자기소개서를 입력하고 <br />
              면접 예상 질문을 받아보세요!
            </div>
            {/* 전체 배열의 개수만큼 출력하는게 아니라 퀘스천 넘버의 가장 큰 숫자만큼? 반복 */}
            {detailData.map((question) => {
              return <ReplyItem key={question.id} question={question} />;
            })}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default InterviewDetail;

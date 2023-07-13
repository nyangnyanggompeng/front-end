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
          '.length.over': {
            color: `${theme.red}`,
          },
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
    type: '일반',
    count: '1',
    prompt: '',
  });

  const [detailData, setDetailData] = useState<InterviewDetailData[]>([]);
  const questionSet = new Set<number>();

  // console.log(id, type, name, createdAt);

  const handleOnChange = (className: string, value: string) => {
    setFormData({ ...formData, [className]: value });
  };

  const onSubmit = async () => {
    try {
      const res = await axios.post(`/chatgpt/contents/${id}`, formData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getChatData = async () => {
    try {
      const res = await axios.get(`/chatgpt/contents/${id}`);
      setDetailData(res.data);
      console.log(res.data);
      res.data.map((el: InterviewDetailData) =>
        questionSet.add(el.questionNum)
      );
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
        <form onSubmit={onSubmit}>
          <div className='radio-box'>
            <p>면접 유형</p>
            {radio.map((item, idx) => {
              return (
                <label key={idx}>
                  <input
                    type='radio'
                    name='type'
                    className='type'
                    value={item}
                    defaultChecked={type === item || (!type && item === '일반')}
                    onChange={(e) =>
                      handleOnChange(e.target.className, e.target.value)
                    }
                  />
                  {item}면접
                </label>
              );
            })}
          </div>
          <div className='count-box'>
            <label htmlFor='count'>예상 질문 개수</label>
            <select
              id='count'
              className='count'
              defaultValue={'1'}
              onChange={(e) =>
                handleOnChange(e.target.className, e.target.value)
              }
            >
              <option value={'1'}>1</option>
              <option value={'2'}>2</option>
              <option value={'3'}>3</option>
              <option value={'4'}>4</option>
              <option value={'5'}>5</option>
              <option value={'6'}>6</option>
              <option value={'7'}>7</option>
              <option value={'8'}>8</option>
              <option value={'9'}>9</option>
              <option value={'10'}>10</option>
            </select>
          </div>
          <div className='prompt-box'>
            <div className='txt-info'>
              <label htmlFor='text'>자기소개서</label>
              <p>
                <span
                  className={
                    formData.prompt.length === 3000 ? 'length over' : 'length'
                  }
                >
                  {formData.prompt.length}
                </span>{' '}
                / 3000
              </p>
            </div>
            <textarea
              id='text'
              className='prompt'
              placeholder='자기소개서를 입력해 주세요.'
              maxLength={3000}
              value={formData.prompt}
              onChange={(e) =>
                handleOnChange(e.target.className, e.target.value)
              }
            />
          </div>
          <Button onClick={onSubmit}>질문하기</Button>
        </form>
        <div className='reply-wrap'>
          <Button status='sub' onClick={() => console.log('전체 접기/펴기')}>
            전체 펴기
            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
          <ul className='reply-list'>
            {/* 전체 배열의 개수만큼 출력하는게 아니라 퀘스천 넘버의 가장 큰 숫자만큼? 반복 */}
            {!detailData || detailData.length === 0 ? (
              <div className='no-content'>
                자기소개서를 입력하고 <br />
                면접 예상 질문을 받아보세요!
              </div>
            ) : (
              Array.from(questionSet).map((item, idx) => {
                const filtered = detailData.filter(
                  (el) => el.questionNum === item
                );
                return (
                  <ReplyItem key={idx} questionNum={item} messages={filtered} />
                );
              })
            )}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default InterviewDetail;

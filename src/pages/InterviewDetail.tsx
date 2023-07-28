import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../components/Common/Button';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ReplyItem from '../components/Interview/ReplyItem';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { FormData, InterviewDetailData } from '../types/Interview/detailTypes';
import { parseDate } from '../utils/Interview/interviewListFn';
import { Theme, css, useTheme } from '@emotion/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getChatData } from '../utils/Interview/interviewDetailFn';
import { Loading } from '../components/Common';

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
      marginBottom: '10rem',
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
          '&.disabled': {
            backgroundColor: `${theme.gray2}`,
          },
        },
      },
    },
    '.reply-wrap': {
      display: 'flex',
      flexDirection: 'column',

      '> button': {
        alignSelf: 'flex-end',
      },
      '.no-content': {
        fontSize: '3rem',
        fontWeight: 700,
        textAlign: 'center',
        margin: '10rem 0',
      },
      '.reply-list': {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: '5rem',
        gap: '10rem',
      },
    },
  });

const InterviewDetail = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, createdAt } = location.state;
  const radio = ['일반', '기술', '인성'];
  const [formData, setFormData] = useState({
    type: '일반',
    count: '1',
    prompt: '',
  });
  const [questionSet, setQusetionSet] = useState<Set<number>>(new Set());
  const [customLoading, setCustomLoading] = useState(false);

  const { isLoading, data } = useQuery<[FormData, InterviewDetailData[]]>({
    queryKey: ['InterviewDetailData', id],
    queryFn: () => getChatData(id),
  });

  const [isCloseList, setIsCloseList] = useState<{ [key: number]: boolean }>(
    {}
  );

  const queryClient = useQueryClient();

  const handleOnChange = (className: string, value: string) => {
    setFormData({ ...formData, [className]: value });
  };

  const onSubmit = async () => {
    if (formData.prompt === '') {
      alert('자기소개서를 입력해 주세요.');
      return;
    }
    try {
      setCustomLoading(true);
      await axios.post(`/chatgpt/contents/${id}`, formData);
      queryClient.invalidateQueries({ queryKey: ['InterviewDetailData'] });
      setCustomLoading(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.response?.data) {
          case 'WRONG_CHATGPT_LIST':
            return alert('대화 목록이 없습니다.');
          case 'PROMPT_OR_TYPE_OR_COUNT_NO_ENTERED':
            return alert(
              '입력되지 않은 값이 있습니다. 질문을 다시 확인해 주세요.'
            );
          case 'TOO_MANY_QUESTIONS':
            return alert('예상 질문은 최대 10개까지 받아볼 수 있습니다.');
          default:
            return navigate(`/error/${err.response?.status}`);
        }
      }
    }
  };

  const deleteQuestion = async (listId: number, contentIdList: number[]) => {
    try {
      setCustomLoading(true);
      await axios.put(`/chatgpt/lists/${listId}/contents`, { contentIdList });
      alert('질문이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['InterviewDetailData'] });
      setCustomLoading(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.response?.data) {
          case 'POST_DOESNT_EXIT':
            return alert('삭제된 대화 목록입니다.');
          case 'NO_PERMISSIONS':
            return alert('권한이 없는 사용자입니다.');
          case 'UNABLE_TO_DELETE_CONTENT':
            return alert('삭제할 수 없는 대화입니다.');
          default:
            return navigate(`/error/${err.response?.status}`);
        }
      }
    }
  };

  const questionsCloseToggle = () => {
    const value =
      Object.values(isCloseList).filter((el) => el === true).length >= 1
        ? false // 전체 펴기
        : true; // 전체 닫기
    const obj: { [key: number]: boolean } = {};

    for (let i = 0; i < Array.from(questionSet).length; i++) {
      obj[Array.from(questionSet)[i]] = value;
    }

    setIsCloseList(obj);
  };

  if (isLoading || customLoading) return <Loading theme={theme} />;

  return (
    <main css={StyledInterviewDetail(theme)}>
      <div className='inner'>
        <h2>인터뷰 룸</h2>
        <div className='title'>
          <span
            className={
              data && data[0].prompt !== '' ? `type ${data[0].type}` : 'type'
            }
          >
            {data && data[0].prompt !== '' ? `${data[0].type}면접` : '작성 중'}
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
                    defaultChecked={
                      (data && data[0].type === item) ||
                      (data === undefined && item === '일반')
                    }
                    disabled={data && data[0].prompt !== ''}
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
              value={
                data && data[1].length !== 0
                  ? data && data[0].count
                  : formData.count
              }
              disabled={data && data[0].prompt !== ''}
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
                    (data && data[0].prompt.length === 3000) ||
                    formData.prompt.length === 3000
                      ? 'length over'
                      : 'length'
                  }
                >
                  {(data && data[0].prompt.length) || formData.prompt.length}
                </span>{' '}
                / 3000
              </p>
            </div>
            <textarea
              id='text'
              className={
                data && data[0].prompt !== '' ? 'prompt disabled' : 'prompt'
              }
              placeholder='자기소개서를 입력해 주세요.'
              maxLength={3000}
              value={(data && data[0].prompt) || formData.prompt}
              disabled={data && data[0].prompt !== ''}
              onChange={(e) =>
                handleOnChange(e.target.className, e.target.value)
              }
            />
          </div>
          <Button
            onClick={onSubmit}
            status={data && data[0].prompt !== '' ? 'disable' : 'main'}
          >
            질문하기
          </Button>
        </form>
        <div className='reply-wrap'>
          <Button status='sub' onClick={questionsCloseToggle}>
            {Object.values(isCloseList).filter((el) => el === true).length >=
            1 ? (
              <>
                전체 펴기
                <FontAwesomeIcon icon={faChevronDown} />
              </>
            ) : (
              <>
                전체 접기
                <FontAwesomeIcon icon={faChevronUp} />
              </>
            )}
          </Button>
          {!data || data[1].length === 0 ? (
            data && data[0].prompt !== '' ? (
              <div className='no-content'>
                질문을 전송할 수 없습니다. <br />새 대화를 만들고 사용해 주세요.
              </div>
            ) : (
              <div className='no-content'>
                자기소개서를 입력하고 <br />
                면접 예상 질문을 받아보세요!
              </div>
            )
          ) : (
            <ul className='reply-list'>
              {data &&
                data[1].map((el: InterviewDetailData) =>
                  questionSet.add(el.questionNum)
                ) &&
                Array.from(questionSet).map((item, idx) => {
                  const filtered = data[1].filter(
                    (el) => el.questionNum === item
                  );
                  return (
                    <ReplyItem
                      key={idx}
                      questionNum={item}
                      messages={filtered}
                      // sendAnswer={sendAnswer}
                      deleteQuestion={deleteQuestion}
                      isCloseList={isCloseList}
                      setIsCloseList={setIsCloseList}
                    />
                  );
                })}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
};

export default InterviewDetail;

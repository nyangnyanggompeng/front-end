import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Common/Button';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleExclamation,
  faSpinner,
  faUserLock,
} from '@fortawesome/free-solid-svg-icons';

const StyledErrorPage = () =>
  css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5rem 0',

    '.inner': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      svg: {
        fontSize: '8rem',
        marginBottom: '3rem',
      },

      h2: {
        marginBottom: 0,
      },
      h3: {
        marginBottom: '5rem',
      },
      h4: {
        marginBottom: '10rem',
        whiteSpace: 'pre-line',
        textAlign: 'center',
        fontWeight: 400,
      },
    },

    '.btn-box': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
    },
  });

const errorCase = [
  {
    code: '403',
    icon: faUserLock,
    title: 'Forbidden',
    msg: `해당 페이지를 볼 수 있는 권한을 가지고 있지 않습니다.`,
  },
  {
    code: '404',
    icon: faCircleExclamation,
    title: 'Not Found',
    msg: `입력한 주소가 잘못되었거나 요청하신 페이지의 주소가 삭제되어 찾을 수 없습니다.\n서비스 이용에 불편을 드려 죄송합니다.`,
  },
  {
    code: '500',
    icon: faSpinner,
    title: 'Internal Server Error',
    msg: `서버의 일시적인 장애나 네트워크 문제로 인해 예상하지 못한 오류가 발생했습니다.\n잠시 후에 다시 시도해 주세요.`,
  },
];

const ErrorPage = () => {
  const { error } = useParams();
  const navigate = useNavigate();
  // const theme = useTheme();

  let code;
  switch (error) {
    case undefined:
      code = errorCase[1];
      break;
    case '403':
      code = errorCase[0];
      break;
    case '404':
      code = errorCase[1];
      break;
    case '500':
      code = errorCase[2];
      break;
    default:
      code = errorCase[2];
  }

  return (
    <main css={StyledErrorPage()}>
      <div className='inner'>
        <FontAwesomeIcon icon={code.icon} />
        <h2>{error}</h2>
        <h3>{code.title}</h3>
        <h4>{code.msg}</h4>
        <div className='btn-box'>
          <Button onClick={() => navigate(-1)}>뒤로 가기</Button>
          <Button status='sub' onClick={() => navigate('/')}>
            메인으로 가기
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;

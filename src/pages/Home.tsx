import imgVisual from '../asset/img-visual.png';
import imgInterview from '../asset/img-interview.png';
import imgCommunity from '../asset/img-community.png';
import imgOutro from '../asset/img-outro.png';
import icoHandShake from '../asset/ico-handshake.png';
import { useNavigate } from 'react-router-dom';
import { Theme, css, useTheme } from '@emotion/react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const StyledHome = (theme: Theme) =>
  css({
    h2: {
      fontSize: '6.4rem',
      fontWeight: 700,
      lineHeight: 1,
    },
    '.tit-desc': {
      fontSize: '1.8rem',
      fontWeight: 500,
      marginTop: '2rem',
    },
    h3: {
      fontSize: '5rem',
      fontWeight: 700,
    },
    section: {
      height: 'calc(100vh - 8rem)',
    },
    button: {
      fontSize: '1.8rem',
      fontWeight: 700,
      backgroundColor: `${theme.orange1}`,
      color: `${theme.white}`,
      padding: '1.5rem 2rem',
      borderRadius: 5,
      transition: 'all 0.3s',
      '&:hover': {
        backgroundColor: `${theme.orange2}`,
      },
    },

    '.visual': {
      backgroundColor: `${theme.blue1}`,
      '.inner': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        background: `url(${imgVisual}) no-repeat 130% 50% / contain`,
        height: '100%',
      },
      h2: {
        '&:first-of-type': {
          marginBottom: '2rem',
        },
      },
      '.tit-desc': {
        margin: '3rem 0 4rem',
      },
      '.dots': {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '40%',
        marginBottom: '1rem',
        span: {
          display: 'block',
          width: '1.2rem',
          height: '1.2rem',
          borderRadius: '50%',
          backgroundColor: `${theme.blue2}`,
        },
      },
    },

    '.interview': {
      textAlign: 'center',
      padding: '15rem 0 25rem',
      height: 'auto',
      '.flex-box': {
        marginTop: '5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        '.left': {
          width: '35%',
          display: 'flex',
          flexFlow: 'column wrap',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '10rem',

          li: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            flexFlow: 'column wrap',
            textAlign: 'right',
          },

          '.number': {
            fontSize: '4rem',
            fontWeight: 700,
            border: `2px solid ${theme.orange1}`,
            width: '7rem',
            height: '7rem',
            borderRadius: 5,
            color: `${theme.orange1}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '2rem',
          },
          h4: {
            marginBottom: '1rem',
            fontSize: '2rem',
            fontWeight: 700,
          },
          '.desc': {
            fontSize: '1.8rem',
          },
        },
        '.right': {
          width: '55%',
        },
      },
    },

    '.community': {
      backgroundColor: 'rgba(232,119,1, 0.8)',
      position: 'relative',
      height: '100vh',
      color: `${theme.white}`,

      '.inner': {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100%',

        '.imgs': {
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
        },
        '.icon': {
          border: `2px solid ${theme.white}`,
          borderRadius: 5,
          display: 'inline-block',
          padding: '1rem',
        },
      },
    },
    '.outro': {
      height: 'auto',
      padding: '25rem 0 10rem',
      '.inner': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'column wrap',

        img: {
          margin: '10rem 0',
        },
      },
    },
  });

export function Home() {
  const theme = useTheme();
  const navigate = useNavigate();

  const duration = 1000;
  const delay = 500;
  // data-aos='fade-up'
  // data-aos-duration={duration}
  // data-aos-delay={delay}

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <main css={StyledHome(theme)}>
      <section className='visual'>
        <div className='inner'>
          <div className='contents'>
            <div className='dots'>
              <span
                data-aos='fade-up'
                data-aos-duration={duration}
                data-aos-delay={delay * 2.5}
              ></span>
              <span
                data-aos='fade-up'
                data-aos-duration={duration}
                data-aos-delay={delay * 3}
              ></span>
              <span
                data-aos='fade-up'
                data-aos-duration={duration}
                data-aos-delay={delay * 3.5}
              ></span>
              <span
                data-aos='fade-up'
                data-aos-duration={duration}
                data-aos-delay={delay * 4}
              ></span>
            </div>
            <h2 data-aos='fade-up' data-aos-duration={duration}>
              똑똑하게 면접 준비하기
            </h2>
            <h2
              data-aos='fade-up'
              data-aos-duration={duration}
              data-aos-delay={delay}
            >
              인터뷰 연구소
            </h2>
            <p
              className='tit-desc'
              data-aos='fade-up'
              data-aos-duration={duration}
              data-aos-delay={delay * 2}
            >
              인공지능 AI 서비스인 ChatGPT를 이용하여 <br />
              쉽고 간편하게 면접 준비해보세요!
            </p>
            <button
              type='button'
              onClick={() => navigate('/sign-in')}
              data-aos='fade-up'
              data-aos-duration={duration}
              data-aos-delay={delay * 3}
            >
              서비스 이용하기
            </button>
          </div>
        </div>
      </section>
      <section className='interview'>
        <div className='inner'>
          <h3 data-aos='fade-up' data-aos-duration={duration}>
            개인별 맞춤 예상 질문
          </h3>
          <p
            className='tit-desc'
            data-aos='fade-up'
            data-aos-duration={duration}
            data-aos-delay={delay}
          >
            내 자기소개서를 바탕으로 나에게 꼭 필요한 예상 질문을 받아볼 수
            있습니다.
          </p>
          <div className='flex-box'>
            <ul
              className='left'
              data-aos='fade-up'
              data-aos-duration={duration}
              data-aos-delay={delay * 3}
            >
              <li data-aos='fade-up' data-aos-duration={duration}>
                <div className='number'>1</div>
                <h4>다양한 면접 유형</h4>
                <p className='desc'>
                  일반 면접, 인성 면접, 기술 면접 중 원하는 유형을 선택해 질문을
                  받아볼 수 있어요.
                </p>
              </li>
              <li data-aos='fade-up' data-aos-duration={duration}>
                <div className='number'>2</div>
                <h4>자소서별 면접질문 관리</h4>
                <p className='desc'>
                  여러 자기소개서에 대한 다양한 종류의 예상 면접 질문을 한번에
                  관리할 수 있어요.
                </p>
              </li>
              <li data-aos='fade-up' data-aos-duration={duration}>
                <div className='number'>3</div>
                <h4>맞춤형 예상질문</h4>
                <p className='desc'>
                  내가 작성한 자기소개서를 기반으로 ChatGPT를 이용한 예상질문을
                  받아볼 수 있어요.
                </p>
              </li>
              <li data-aos='fade-up' data-aos-duration={duration}>
                <div className='number'>4</div>
                <h4>원하는 것만 모아보기</h4>
                <p className='desc'>
                  북마크 기능을 사용해 원하는 질문만 모아서 볼 수 있어요.
                </p>
              </li>
            </ul>
            <div
              className='right'
              data-aos='fade-left'
              data-aos-duration={duration}
              data-aos-delay={delay * 2}
            >
              <img src={imgInterview} alt='인터뷰 룸 예시 페이지' />
            </div>
          </div>
        </div>
      </section>
      <section className='community'>
        <div className='inner'>
          <div className='imgs'>
            <img
              src={imgCommunity}
              alt='인터뷰 연구소 커뮤니티 예시 페이지'
              data-aos='fade-right'
              data-aos-duration={duration}
            />
          </div>
          <div className='contents'>
            <div
              className='icon'
              data-aos='fade-up'
              data-aos-duration={duration}
              data-aos-delay={delay}
            >
              <img src={icoHandShake} alt='악수 아이콘' />
            </div>
            <h3
              data-aos='fade-up'
              data-aos-duration={duration}
              data-aos-delay={delay * 2}
            >
              함께 면접 준비하기
            </h3>
            <p
              className='tit-desc'
              data-aos='fade-up'
              data-aos-duration={duration}
              data-aos-delay={delay * 2.5}
            >
              커뮤니티 공간에서 같은 취업 준비생들과 <br />
              면접 팁이나 경험을 나눌 수 있어요.
            </p>
          </div>
        </div>
      </section>
      <section className='outro'>
        <div className='inner'>
          <h3 data-aos='fade-up' data-aos-duration={duration}>
            지금 바로 시작해 보세요!
          </h3>
          <img
            src={imgOutro}
            alt='인터뷰 연구소 모니터 목업'
            data-aos='fade-up'
            data-aos-delay={delay * 2}
            data-aos-duration={duration}
          />
          <button
            type='button'
            onClick={() => navigate('/sign-in')}
            data-aos='fade-up'
            data-aos-duration={duration}
            // data-aos-delay={delay}
          >
            서비스 이용하러 가기
          </button>
        </div>
      </section>
    </main>
  );
}

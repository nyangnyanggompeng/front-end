import { useEffect } from 'react';

export default function useHandleUnloadEvent() {
  useEffect(() => {
    // 뒤로가기, 새로고침, 창 끄기 등 현재 페이지를 벗어나는 경우에 경고 alert 띄우기
    window.addEventListener('beforeunload', beforeunloadHandler);
    return () => {
      window.removeEventListener('beforeunload', beforeunloadHandler);
    };
  }, []);

  function beforeunloadHandler(e: BeforeUnloadEvent) {
    e.preventDefault();
    console.log('beforeunload');
    e.returnValue = '';
  }
}

import { useEffect } from 'react';
import { useIsDark } from '../Common';

export function useTuiDarkMode(mode: 'VIEWER' | 'EDITOR') {
  const isDark = useIsDark();
  useEffect(() => {
    // NOTE: useRef로 classname을 변경할 수 있는 방법?
    const el =
      mode === 'VIEWER'
        ? document.getElementById('viewer-component')
        : document.getElementsByClassName('toastui-editor-defaultUI')[0];
    if (!el) return;
    if (!isDark && el.classList.contains('toastui-editor-dark'))
      el.classList.remove('toastui-editor-dark');
    else if (isDark && !el.classList.contains('toastui-editor-dark'))
      el.classList.add('toastui-editor-dark');
  }, [isDark]);
}

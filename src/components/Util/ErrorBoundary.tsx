import { Component, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { ErrorPage } from '../../pages';

type Props = {
  children: ReactNode;
};

type State = {
  errorStatus: 401 | 403 | 404 | 500 | null;
};

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    errorStatus: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    switch (error.message) {
      case 'FORBIDDEN':
        // 권한이 없는 페이지에 접근한 경우
        return { errorStatus: 403 };
      case 'NOT_FOUND':
        // 존재하지 않는 페이지에 접근한 경우
        return { errorStatus: 404 };
      case 'INTERNAL_SERVER_ERROR':
        // 서버에서 에러가 발생한 경우
        return { errorStatus: 500 };
      case 'EXPIRED_TOKEN':
        // 토큰이 만료된 경우 -> 로그인 페이지로 이동
        return { errorStatus: 401 };
      default:
        return { errorStatus: 500 };
    }
  }

  public componentDidCatch(error: Error) {
    if (error.message === 'EXPIRED_TOKEN') {
      alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
    }
  }

  public render(): ReactNode {
    if (this.state.errorStatus) {
      if (this.state.errorStatus === 401) {
        return <Navigate to='/login' />;
      }
      return <ErrorPage error={this.state.errorStatus} />;
    }

    return this.props.children;
  }
}

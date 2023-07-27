import { Component, ReactNode } from 'react';
import { ErrorPage } from '../../pages';

type Props = {
  children: ReactNode;
};

type State = {
  errorStatus: 403 | 404 | 500 | null;
};

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    errorStatus: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    if (error.message === 'Forbidden') {
      return { errorStatus: 403 };
    } else if (error.message === 'Not Found') {
      return { errorStatus: 404 };
    } else if (error.message === 'Internal Server Error') {
      return { errorStatus: 500 };
    }

    return { errorStatus: null };
  }

  public render(): ReactNode {
    if (this.state.errorStatus) {
      return <ErrorPage error={this.state.errorStatus} />;
    }

    return this.props.children;
  }
}

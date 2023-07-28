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
    if (error.message === 'FORBIDDEN') {
      return { errorStatus: 403 };
    } else if (error.message === 'NOT_FOUND') {
      return { errorStatus: 404 };
    } else if (error.message === 'INTERNAL_SERVER_ERROR') {
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

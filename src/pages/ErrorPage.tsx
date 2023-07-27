type Props = {
  error: 403 | 404 | 500 | null;
};

export const ErrorPage = ({ error }: Props) => {
  /**
   * NOTE : ErrorBounary에서 사용할 수 있게 code를 받아오는 부분을 조금 변경했습니다.
   * 기존 const { error } = useParams(); 코드를 props로 받아오는 방식으로 변경했어요.
   * 그 외의 내용은 기존 ErrorBoundary.tsx와 동일하게 해서 합치면 될 것 같습니다.
   */
  if (error === 403) {
    return <h1>Forbidden</h1>;
  } else if (error === 404) {
    return <h1>Not Found</h1>;
  } else if (error === 500) {
    return <h1>Internal Server Error</h1>;
  }

  return <h1>Something went wrong.</h1>;
};

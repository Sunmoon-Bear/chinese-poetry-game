
import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#FCF6E9',
      color: '#4A3728',
      fontFamily: '"Noto Serif SC", serif',
    }}>
      <h1>出错了</h1>
      <p>{error instanceof Error ? error.message : '页面加载失败'}</p>
    </div>
  );
};

export default ErrorBoundary;

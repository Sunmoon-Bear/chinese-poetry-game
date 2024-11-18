import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, Component, ErrorInfo, ReactNode, useEffect } from 'react';
import Home from './pages/home';
import PoemSelect from './pages/poem-select';
import Game from './pages/game';

// 微信环境检测
const isWeixinBrowser = () => {
  return /MicroMessenger/i.test(window.navigator.userAgent);
};

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          fontSize: '16px',
          color: '#666'
        }}>
          出错了，请刷新页面重试
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  useEffect(() => {
    if (isWeixinBrowser()) {
      // 微信环境下的特殊处理
      document.body.style.overscrollBehavior = 'none';
      document.documentElement.style.touchAction = 'manipulation';
    }
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          fontSize: '16px',
          color: '#666'
        }}>
          加载中...
        </div>
      }>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/poem-select" element={<PoemSelect />} />
            <Route path="/game/:id" element={<Game />} />
          </Routes>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App; 
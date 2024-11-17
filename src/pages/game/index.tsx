import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { poems } from '../../data/poems';
import GameGrid from './components/GameGrid';
import ProgressBar from './components/ProgressBar';
import CompletionModal from './components/CompletionModal';
import DecorativeBackground from './components/DecorativeBackground';
import Timer from './components/Timer';
import styles from './styles/Game.module.css';

const GamePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const poem = poems.find(p => p.id === Number(id));
  
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [shuffleCount, setShuffleCount] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  
  // 添加计时器效果
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now() - startTime);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [startTime]);
  
  const poemLines = poem?.content
    .split(/[，。]/)  // 同时以逗号和句号分割
    .filter(line => line.length > 0)
    .map(line => line.replace(/[，。！？；：]/g, '')) || [];

  const handleLineComplete = useCallback((line: string) => {
    const currentPoemLine = poemLines[currentRound];
    
    if (line === currentPoemLine) {
      setCompletedLines(prev => [...prev, line]);
      
      setTimeout(() => {
        setCurrentRound(prevRound => {
          if (prevRound === poemLines.length - 1) {
            setTotalTime(Date.now() - startTime);
            setShowCompletionModal(true);
            return prevRound;
          }
          return prevRound + 1;
        });
      }, 1500);
    }
  }, [poemLines, currentRound, startTime]);

  const handleReset = () => {
    setCompletedLines([]);
    setCurrentRound(0);
    setShowCompletionModal(false);
    setStartTime(Date.now());
    setCurrentTime(0);
    setTotalTime(0);
  };

  const handleBack = () => {
    navigate('/poem-select');
  };

  const handleShuffle = () => {
    setShuffleCount(prev => prev + 1);
  };

  if (!poem) {
    return <div className={styles.error}>诗词不存在</div>;
  }

  return (
    <div className={styles.container}>
      <DecorativeBackground />
      <button className={styles.backButton} onClick={handleBack}>
        重选
      </button>
      <div className={styles.contentLayer}>
        <header className={styles.header}>
          <div className={styles.poemInfo}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{poem.title}</h1>
              <div className={styles.author}>
                {poem.author} · {poem.dynasty === 'tang' ? '唐' : '宋'}
              </div>
            </div>
          </div>
        </header>
        
        <main className={styles.gameArea}>
          <div className={styles.gameHeader}>
            <div className={styles.roundInfo}>
              第 {currentRound + 1} 句 / 共 {poemLines.length} 句
            </div>
            <Timer time={currentTime} />
          </div>
          <GameGrid 
            key={`${poem.id}-${currentRound}-${shuffleCount}`}
            content={poem.content}
            difficulty={poem.difficulty}
            currentRound={currentRound}
            onLineComplete={handleLineComplete}
            onShuffle={handleShuffle}
          />
        </main>
        
        <footer className={styles.toolbar}>
          <button className={styles.toolButton} onClick={handleShuffle}>
            重新排列
          </button>
          <button className={styles.toolButton} onClick={handleReset}>
            重新开始
          </button>
        </footer>
      </div>
      
      {showCompletionModal && (
        <CompletionModal
          poem={poem}
          totalTime={totalTime}
          onClose={handleReset}
          onNext={() => navigate('/poem-select')}
        />
      )}
    </div>
  );
}

export default GamePage; 
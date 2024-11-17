import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { poems } from '../../data/poems';
import PoemCard from './components/PoemCard';
import styles from './styles/PoemSelect.module.css';

const DECORATIVE_CHARS = '诗词歌赋韵律风雅清音墨笔丹青意悠远山水花鸟春夏秋冬';

const PoemSelectPage = () => {
  const navigate = useNavigate();
  const [selectedPoem, setSelectedPoem] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    dynasty: 'all',
    difficulty: 'all'
  });
  const [chars, setChars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const elements = [];
    for (let i = 0; i < 30; i++) {
      const char = DECORATIVE_CHARS[Math.floor(Math.random() * DECORATIVE_CHARS.length)];
      const rotation = Math.random() * 180 - 90;
      const size = Math.random() * 120 + 40;
      
      const style = {
        position: 'absolute' as const,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        fontSize: `${size}px`,
        opacity: 0.035,
        color: '#926F5B',
        transform: `rotate(${rotation}deg)`,
        zIndex: 0,
        fontFamily: '"Noto Serif SC", serif',
        fontWeight: Math.random() > 0.5 ? 400 : 500,
        pointerEvents: 'none' as const,
        userSelect: 'none' as const,
        transition: 'all 1s ease-out',
      };
      
      elements.push(
        <div key={i} style={style}>
          {char}
        </div>
      );
    }
    setChars(elements);
  }, []);

  const handlePoemSelect = (id: number) => {
    setSelectedPoem(prev => prev === id ? null : id);
  };

  const handleConfirm = () => {
    if (selectedPoem !== null) {
      const poem = poems.find(p => p.id === selectedPoem);
      if (poem) {
        navigate(`/game/${poem.id}`);
      }
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const filteredPoems = poems.filter(poem => {
    if (filters.dynasty !== 'all' && poem.dynasty !== filters.dynasty) return false;
    if (filters.difficulty === 'all') return true;
    return poem.difficulty === Number(filters.difficulty);
  });

  return (
    <div className={styles.container}>
      <div className={styles.decorativeLayer}>
        {chars}
      </div>
      <div className={styles.contentLayer}>
        <button className={styles.backButton} onClick={handleBack}>
          返回
        </button>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>选择诗词</h1>
        </div>
        <div className={styles.filterSection}>
          <div className={styles.filterGroup}>
            <span className={styles.filterTitle}>朝代</span>
            <div className={styles.filterOptions}>
              <button 
                className={`${styles.filterButton} ${filters.dynasty === 'all' ? styles.active : ''}`}
                onClick={() => setFilters(prev => ({ ...prev, dynasty: 'all' }))}
              >
                全部
              </button>
              <button 
                className={`${styles.filterButton} ${filters.dynasty === 'tang' ? styles.active : ''}`}
                onClick={() => setFilters(prev => ({ ...prev, dynasty: 'tang' }))}
              >
                唐诗
              </button>
              <button 
                className={`${styles.filterButton} ${filters.dynasty === 'song' ? styles.active : ''}`}
                onClick={() => setFilters(prev => ({ ...prev, dynasty: 'song' }))}
              >
                宋词
              </button>
            </div>
          </div>
          <div className={styles.filterGroup}>
            <span className={styles.filterTitle}>难度</span>
            <div className={styles.filterOptions}>
              <button 
                className={`${styles.filterButton} ${filters.difficulty === 'all' ? styles.active : ''}`}
                onClick={() => setFilters(prev => ({ ...prev, difficulty: 'all' }))}
              >
                全部
              </button>
              <button 
                className={`${styles.filterButton} ${filters.difficulty === '1' ? styles.active : ''}`}
                onClick={() => setFilters(prev => ({ ...prev, difficulty: '1' }))}
              >
                初级
              </button>
              <button 
                className={`${styles.filterButton} ${filters.difficulty === '2' ? styles.active : ''}`}
                onClick={() => setFilters(prev => ({ ...prev, difficulty: '2' }))}
              >
                中级
              </button>
              <button 
                className={`${styles.filterButton} ${filters.difficulty === '3' ? styles.active : ''}`}
                onClick={() => setFilters(prev => ({ ...prev, difficulty: '3' }))}
              >
                高级
              </button>
            </div>
          </div>
        </div>
        <div className={styles.poemGridContainer}>
          <div className={styles.poemGrid}>
            {filteredPoems.map((poem) => (
              <PoemCard
                key={poem.id}
                title={poem.title}
                author={poem.author}
                dynasty={poem.dynasty === 'tang' ? '唐' : '宋'}
                difficulty={poem.difficulty}
                content={poem.content}
                selected={selectedPoem === poem.id}
                onClick={() => handlePoemSelect(poem.id)}
              />
            ))}
          </div>
        </div>
        <div className={styles.confirmButtonContainer}>
          <button 
            className={`${styles.confirmButton} ${selectedPoem !== null ? styles.visible : ''}`}
            onClick={handleConfirm}
            disabled={selectedPoem === null}
          >
            开始游戏
            <span className={styles.buttonEffect}></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoemSelectPage; 
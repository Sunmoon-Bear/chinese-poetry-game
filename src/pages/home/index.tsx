import Header from './components/Header';
import StartButton from './components/StartButton';
import styles from './styles/Home.module.css';
import { useEffect, useState } from 'react';

const DECORATIVE_CHARS = '诗词歌赋韵律风雅清音墨笔丹青意悠远山水花鸟春夏秋冬';

const HomePage = () => {
  const [chars, setChars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const elements = [];
    
    for (let i = 0; i < 30; i++) {
      const char = DECORATIVE_CHARS[Math.floor(Math.random() * DECORATIVE_CHARS.length)];
      const rotation = Math.random() * 180 - 90;
      const size = Math.random() * 120 + 40;
      
      elements.push(
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          fontSize: `${size}px`,
          opacity: size > 120 ? 0.045 : 0.055,
          color: '#926F5B',
          transform: `rotate(${rotation}deg)`,
          zIndex: 0,
          fontFamily: '"Noto Serif SC", serif',
          fontWeight: Math.random() > 0.5 ? 400 : 500,
          pointerEvents: 'none',
          userSelect: 'none',
          transition: 'all 1s ease-out'
        }}>
          {char}
        </div>
      );
    }
    
    setChars(elements);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.decorativeLayer}>
        {chars}
      </div>
      <div className={styles.contentLayer}>
        <Header />
        <StartButton />
      </div>
    </div>
  );
};

export default HomePage; 
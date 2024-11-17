import { useEffect, useState, useCallback } from 'react';
import styles from './index.module.css';

interface DecoChar {
  id: number;
  char: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  floatDelay: number;
}

const DECORATIVE_CHARS = '诗词歌赋韵律风雅清音墨笔丹青意悠远山水花鸟春夏秋冬';
const CHAR_COUNT = 24;

const DecorativeBackground: React.FC = () => {
  const [chars, setChars] = useState<DecoChar[]>([]);

  const generateChar = useCallback((id: number): DecoChar => {
    return {
      id,
      char: DECORATIVE_CHARS[Math.floor(Math.random() * DECORATIVE_CHARS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 120 + 40,
      rotation: Math.random() * 180 - 90,
      floatDelay: Math.random() * 2
    };
  }, []);

  useEffect(() => {
    const newChars = Array.from({ length: CHAR_COUNT }, (_, i) => generateChar(i));
    setChars(newChars);
  }, [generateChar]);

  return (
    <div className={styles.background}>
      {chars.map(char => (
        <div
          key={char.id}
          className={styles.char}
          style={{
            left: `${char.x}%`,
            top: `${char.y}%`,
            fontSize: `${char.size}px`,
            transform: `rotate(${char.rotation}deg)`,
            opacity: char.size > 120 ? 0.045 : 0.055,
            animationDelay: `${char.floatDelay}s`
          }}
        >
          {char.char}
        </div>
      ))}
    </div>
  );
};

export default DecorativeBackground; 
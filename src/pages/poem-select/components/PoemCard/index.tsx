import styles from './PoemCard.module.css';

interface PoemCardProps {
  title: string;
  author: string;
  dynasty: string;
  difficulty: number;
  content?: string;
  selected?: boolean;
  onClick: () => void;
}

const PoemCard = ({
  title,
  author,
  dynasty,
  difficulty,
  content,
  selected,
  onClick
}: PoemCardProps) => {
  return (
    <div 
      className={`${styles.card} ${selected ? styles.selected : ''}`} 
      onClick={onClick}
    >
      {selected && (
        <div className={styles.checkmark}>
          ✓
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.info}>
        <div className={styles.authorInfo}>
          <span className={styles.author}>{author}</span>
          <span className={styles.dynasty}>{dynasty}</span>
        </div>
        <div className={styles.difficulty}>
          {'⭐'.repeat(difficulty)}
        </div>
      </div>
      {selected && content && (
        <div className={styles.content}>
          <div className={styles.poemLine}>
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default PoemCard; 
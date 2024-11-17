import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  total: number;
  completed: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ total, completed }) => {
  const percentage = (completed / total) * 100;
  
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressInfo}>
        <span className={styles.progressText}>
          已完成 {completed}/{total}
        </span>
        <span className={styles.progressPercentage}>
          {Math.round(percentage)}%
        </span>
      </div>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 
import styles from './CompletionModal.module.css';

interface CompletionModalProps {
  poem: {
    title: string;
    author: string;
    dynasty: string;
    content: string;
  };
  totalTime: number;
  onClose: () => void;
  onNext: () => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({
  poem,
  totalTime,
  onClose,
  onNext
}) => {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}分${remainingSeconds}秒`;
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>恭喜完成!</h2>
        <div className={styles.timeInfo}>
          总用时：{formatTime(totalTime)}
        </div>
        <div className={styles.poemInfo}>
          <h3>{poem.title}</h3>
          <p className={styles.author}>
            {poem.author} · {poem.dynasty === 'tang' ? '唐' : '宋'}
          </p>
        </div>
        <div className={styles.content}>
          {poem.content.split('。').map((line, index) => (
            line && <p key={index} className={styles.line}>{line}。</p>
          ))}
        </div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={onClose}>
            重新开始
          </button>
          <button className={`${styles.button} ${styles.primary}`} onClick={onNext}>
            下一首
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal; 
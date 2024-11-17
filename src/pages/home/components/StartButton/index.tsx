import { useNavigate } from 'react-router-dom';
import styles from './StartButton.module.css';

const StartButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/poem-select');
  };

  return (
    <button 
      className={styles.startButton}
      onClick={handleClick}
    >
      开始游戏
      <span className={styles.buttonEffect}></span>
    </button>
  );
};

export default StartButton; 
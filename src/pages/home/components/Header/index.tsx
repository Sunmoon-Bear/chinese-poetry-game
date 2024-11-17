import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.mainTitle}>诗词连珠</h1>
        <h2 className={styles.subTitle}>妙趣横生的古诗拼字游戏</h2>
      </div>
    </header>
  );
};

export default Header; 
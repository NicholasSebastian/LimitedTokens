import { FC } from 'react';
import styles from '../styles/components/tags.module.scss';

const Tags: FC = () => {
  return (
    <div className={styles.tags}>
      <button>Hot Auction</button>
      <button>Lucky Raffle</button>
      <button>Trending Artist</button>
      <button>Top Collector</button>
    </div>
  );
}

export default Tags;
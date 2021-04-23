import { FC } from 'react';
import Image from 'next/image';
import styles from '../styles/components/loading.module.scss';

const Loading: FC = () => (
  <div className={styles.loading}>
    <Image src='/logo.png' width={60} height={60} />
  </div>
);

export default Loading;
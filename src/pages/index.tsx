import { FC } from 'react';
import styles from '../styles/Home.module.scss';

import Layout from '../components/layout';

const Home: FC = () => {
  return (
    <Layout className={styles.container}>
      <div className={styles.top}>
        <h1>Limited Tokens</h1>
        <div>The first NFT marketplace in Indonesia</div>
        <button>Browse the Market</button>
      </div>
      <section className={styles.center}>
        <h2>Featured Drop</h2>
        <div>here</div>
      </section>
      <section className={styles.center}>
        <h2>Most Popular</h2>
        <div>here</div>
      </section>
      <section className={styles.center}>
        <h2>Latest Releases</h2>
        <div>here</div>
      </section>
    </Layout>
  )
}

export default Home;
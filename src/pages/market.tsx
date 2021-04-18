import { FC, useState, useEffect } from 'react';
import Link from 'next/link';

import styles from '../styles/pages/market.module.scss';
import Layout from '../components/layout';
import Tags from '../components/tags';

const Market: FC = () => {
  useEffect(() =>  {
    // fetch data here.
  }, []);

  const Sorter = (
    <select>
      <option disabled selected>Sortir</option>
      <option>one</option>
      <option>two</option>
      <option>three</option>
    </select>
  );

  return (
    <Layout title="Market">
      <section className={styles.top}>
        <div>
          <div>
            <span>Cari Berdasarkan</span>
            <input type='text' size={40} placeholder="Cari di pasar" />
            <Tags />
          </div>
          {Sorter}
        </div>
      </section>
      <section className={styles.content}>
        {/* dynamically generated content here */}
      </section>
    </Layout>
  );
}

export default Market;
import { FC, useState, useEffect } from 'react';
import Link from 'next/link';

import styles from '../styles/pages/collection.module.scss';
import Layout from '../components/layout';

const Collection: FC = () => {
  useEffect(() =>  {
    // fetch data here.
  }, []);

  return (
    <Layout title="Collection" className={styles.body}>
      <section className={styles.trending}>
        <div>
          <h3>Trending</h3>
          <div>
            <button>Artis</button>
            <button>Kolektor</button>
          </div>
        </div>
        <div>
          {/* dynamically generated content */}
        </div>
      </section>
      <section className={styles.featured}>
        <h3>Unggulan</h3>
        <div>
          {/* dynamically generated content */}
        </div>
      </section>
    </Layout>
  );
}

export default Collection;

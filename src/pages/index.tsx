import { FC, useState, useEffect } from 'react';
import Link from 'next/link';

import styles from '../styles/pages/home.module.scss';
import Layout from '../components/layout';
import VideoSection from '../components/video-section';
import Tags from '../components/tags';

const Home: FC = () => {
  useEffect(() =>  {
    // fetch data here.
  }, []);

  return (
    <Layout>
      <section className={styles.top}>
        <h1>Platform NFT Pertama<br/>di Indonesia</h1>
        <div>
          <Link href="/market"><button>Periksa Pasar</button></Link>
          <Link href="/tutorial"><button>Apa itu NFT?</button></Link>
        </div>
      </section>
      <VideoSection />
      <section className={styles.catalog}>
        <div>
          <h4>Explore!</h4>
          <Tags />
          <div>
            {/* dynamically generated content here */}  
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home;

import { FC } from 'react';
import Image from 'next/image';

import { CompanyName } from '../data.json';
import styles from '../styles/pages/tutorial.module.scss';
import Layout from '../components/layout';
import VideoSection from '../components/video-section';

interface IPersonProps {
  name: string
  src: string
}

const Tutorial: FC = () => {
  const video = (
    <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
      title="YouTube video player" frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen>
    </iframe>
  );

  const Person: FC<IPersonProps> = props => {
    const { name, src } = props;
    const size = 150;
    return (
      <div>
        <Image src={src} alt={name} width={size} height={size} layout='intrinsic' />
        <span>{name}</span>
      </div>
    );
  }

  return (
    <Layout>
      <section className={styles.top}>
        <h1>{CompanyName}</h1>
        <h3>adalah Platform<br />Jual, Beli, dan Tampilkan<br />(Non-Fungible Token) anda</h3>
      </section>
      <VideoSection className={styles.description} />
      <section className={styles.how}>
        <h2>Bagaimana Cara Jual / Beli</h2>
        <div>
          <p>
            Token non-fungible adalah file digital yang identitas dan 
            kepemilikannya unik diverifikasi pada Blockchain.
            NFT tidak saling bertukar.  NFTs umumnya dibuat dengan mengubbah file,
            seperti karya semi digital, ke pasar lelang ini membuat salinan file,
            yang direkam sebagain NFT pada buku besar digital.
          </p>
          {video}
          <div>
            <h5>Sudah Mengerti?</h5>
            <button>Coba {CompanyName}</button>
          </div>
          <div>
            <h5>Masih Bingung?</h5>
            <button>Chat Kami</button>
          </div>
        </div>
      </section>
      <section className={styles.collaboration}>
        <div>
          <h2>Berkolaborasi Dengan</h2>
          <div>
            <Person name="Orang A" src="/placeholder.jpg" />
            <Person name="Orang B" src="/placeholder.jpg" />
            <Person name="Orang C" src="/placeholder.jpg" />
            <Person name="Orang D" src="/placeholder.jpg" />
            <Person name="Orang E" src="/placeholder.jpg" />
            <Person name="Orang F" src="/placeholder.jpg" />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Tutorial;
import { FC } from 'react';
import Link from 'next/link';
import styles from '../styles/components/video-section.module.scss';

interface IProps {
  className?: string
};

const VideoSection: FC<IProps> = props => {
  const video = (
    <iframe width="560" height="315" src="https://www.youtube.com/embed/a8ww4aNlPQU" 
      title="YouTube video player" frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen>
    </iframe>
  );

  const className = props.className ? `${styles.section} ${props.className}` : styles.section;
  return (
    <section className={className}>
      <div>
        {video}
        <div>
          <div>
            <h2>Apa itu NFT?</h2>
            <p>
              Token non-fungible adalah file digital yang identitas dan kepemilikannya unik diverifikasi pada rantai blok. 
              NFT tidak saling bertukar. NFTs umumnya dibuat dengan mengunggah file, seperti karya seni digital, ke pasar lelang.
              Ini membuat salinan file, yang direkam sebagai NFT pada buku besar digital.
            </p>
            <Link href="/tutorial"><button>Tutorial</button></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;